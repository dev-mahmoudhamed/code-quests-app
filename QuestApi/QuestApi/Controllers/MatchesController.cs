using Google.Protobuf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestApi.Data;
using QuestApi.Dtos;
using QuestApi.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace QuestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MatchesController : ControllerBase
    {
        private readonly QuestDbContext _DbContext;

        public MatchesController(QuestDbContext dbContext)
        {
            _DbContext = dbContext;
        }

        [HttpGet]
        public async Task<List<Match>> GetMatchesAsync(MatchStatus status, string? filter)
        {
            await ProduceMsgAsync(status, filter);
            IQueryable<Match> query = _DbContext.Matches;
            var input = await ReceiveMsgAsync();

            if (status != MatchStatus.All)
                query = query.Where(m => m.Status == status);

            if (filter != null)
                query = query.Where(m => m.Competition.Contains(filter));

            return await query.ToListAsync();
        }


        private async Task ProduceMsgAsync(MatchStatus status, string? filter)
        {
            var factory = new ConnectionFactory
            {
                HostName = Environment.GetEnvironmentVariable("RabbitMQ__Host") ?? "rabbitmq",
                UserName = Environment.GetEnvironmentVariable("RabbitMQ__Username") ?? "user",
                Password = Environment.GetEnvironmentVariable("RabbitMQ__Password") ?? "password"
            };
            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            await channel.QueueDeclareAsync(queue: "matchFilter", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var message = new
            {
                Status = status,
                Filter = filter
            };
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
            await channel.BasicPublishAsync(exchange: "", routingKey: "matchFilter", body: body);
        }

        private async Task<MatchFilterInput> ReceiveMsgAsync()
        {
            MatchFilterInput input = new();

            var factory = new ConnectionFactory
            {
                HostName = Environment.GetEnvironmentVariable("RabbitMQ__Host") ?? "rabbitmq",
                UserName = Environment.GetEnvironmentVariable("RabbitMQ__Username") ?? "user",
                Password = Environment.GetEnvironmentVariable("RabbitMQ__Password") ?? "password"
            };
            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            await channel.QueueDeclareAsync(queue: "matchFilter", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new AsyncEventingBasicConsumer(channel);
            consumer.ReceivedAsync += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var json = Encoding.UTF8.GetString(body);
                var messageObj = JsonSerializer.Deserialize<MatchFilterInput>(json);
                input = messageObj;
                return Task.CompletedTask;
            };
            await channel.BasicConsumeAsync(queue: "matchFilter", autoAck: true, consumer: consumer);
            return input;
        }
    }
}
