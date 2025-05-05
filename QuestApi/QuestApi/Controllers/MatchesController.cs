using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestApi.Data;
using QuestApi.Models;

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
            IQueryable<Match> query = _DbContext.Matches;

            if (status != MatchStatus.All)
                query = query.Where(m => m.Status == status);

            if (filter != null)
                query = query.Where(m => m.Competition.Contains(filter));

            return await query.ToListAsync();
        }

    }
}
