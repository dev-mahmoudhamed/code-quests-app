using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using TicketReservationGrpc;

namespace QuestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TicketController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<TicketReply> GetTicketAsync(int userId, string cardNumber)
        {
            var grpcUrl = _configuration["GrpcSettings:TicketService"];

            using var channel = GrpcChannel.ForAddress(grpcUrl);

            var client = new Ticket.TicketClient(channel);

            var response = await client.GetTicketAsync(new TicketRequest
            {
                UserId = userId,
                CardNumber = cardNumber
            });

            return response;
        }
    }
}
