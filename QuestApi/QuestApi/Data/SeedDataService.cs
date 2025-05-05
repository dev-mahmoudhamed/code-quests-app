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
            new() { Title = "Arsenal vs Man City", Competition = "Premier League",
                   Date = DateTime.UtcNow.AddDays(-2), Status = MatchStatus.Replay },
            new() { Title = "Real Madrid vs Dortmund", Competition = "Champions League",
                   Date = DateTime.UtcNow.AddDays(-7), Status = MatchStatus.Replay },
            new() { Title = "Argentina vs France", Competition = "FIFA World Cup",
                   Date = DateTime.UtcNow.AddDays(-9), Status = MatchStatus.Replay },
            new() { Title = "Barcelona vs Real Madrid", Competition = "La Liga",
                   Date = DateTime.UtcNow, Status = MatchStatus.Live },
            new() { Title = "Juventus vs AC Milan", Competition = "Serie A",
                   Date = DateTime.UtcNow, Status = MatchStatus.Live },
            new() { Title = "Bayern vs Dortmund", Competition = "Bundesliga",
                   Date = DateTime.UtcNow, Status = MatchStatus.Live },
            new() { Title = "Manchester United vs Chelsea", Competition = "FA Cup",
                   Date = DateTime.UtcNow.AddDays(-13), Status = MatchStatus.Replay },
            new() { Title = "Germany vs Spain", Competition = "UEFA Euro",
                   Date = DateTime.UtcNow, Status = MatchStatus.Live },
            new() { Title = "Brazil vs Argentina", Competition = "Copa America",
                   Date = DateTime.UtcNow, Status = MatchStatus.Live },
            new() { Title = "Leeds vs Southampton", Competition = "EFL Championship",
                   Date = DateTime.UtcNow.AddDays(-5), Status = MatchStatus.Replay }
        };

            await context.Matches.AddRangeAsync(matches);
            await context.SaveChangesAsync();
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
