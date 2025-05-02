using Microsoft.EntityFrameworkCore;
using QuestApi.Models;

namespace QuestApi.Data
{
    public class SeedDataService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public SeedDataService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<QuestDbContext>();

            await context.Database.EnsureCreatedAsync(cancellationToken);

            if (!await context.Matches.AnyAsync(cancellationToken))
            {
                await SeedMatchesAsync(context);
            }
        }

        private static async Task SeedMatchesAsync(QuestDbContext context)
        {
            var matches = new List<Match>
        {
            new() { Title = "Premier League: Arsenal vs Man City", Competition = "Premier League",
                   DateUtc = DateTime.UtcNow.AddHours(-2), Status = MatchStatus.Replay },
            new() { Title = "UCL Final: Real Madrid vs Dortmund", Competition = "Champions League",
                   DateUtc = DateTime.UtcNow.AddDays(-7), Status = MatchStatus.Replay },
            new() { Title = "World Cup: Argentina vs France", Competition = "FIFA World Cup",
                   DateUtc = DateTime.UtcNow.AddDays(-365), Status = MatchStatus.Replay },
            new() { Title = "La Liga: Barcelona vs Real Madrid", Competition = "La Liga",
                   DateUtc = DateTime.UtcNow.AddHours(2), Status = MatchStatus.Live },
            new() { Title = "Serie A: Juventus vs AC Milan", Competition = "Serie A",
                   DateUtc = DateTime.UtcNow.AddDays(1), Status = MatchStatus.Live },
            new() { Title = "Bundesliga: Bayern vs Dortmund", Competition = "Bundesliga",
                   DateUtc = DateTime.UtcNow.AddDays(3), Status = MatchStatus.Live },
            new() { Title = "FA Cup Final: Manchester United vs Chelsea", Competition = "FA Cup",
                   DateUtc = DateTime.UtcNow.AddDays(-14), Status = MatchStatus.Replay },
            new() { Title = "Euro 2024: Germany vs Spain", Competition = "UEFA Euro",
                   DateUtc = DateTime.UtcNow.AddDays(30), Status = MatchStatus.Live },
            new() { Title = "Copa America: Brazil vs Argentina", Competition = "Copa America",
                   DateUtc = DateTime.UtcNow.AddDays(15), Status = MatchStatus.Live },
            new() { Title = "EFL Championship: Leeds vs Southampton", Competition = "EFL Championship",
                   DateUtc = DateTime.UtcNow.AddHours(-5), Status = MatchStatus.Replay }
        };

            await context.Matches.AddRangeAsync(matches);
            await context.SaveChangesAsync();
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
