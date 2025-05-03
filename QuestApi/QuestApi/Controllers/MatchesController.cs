using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestApi.Data;
using QuestApi.Models;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QuestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly QuestDbContext _DbContext;
        private readonly UserManager<AppUser> _userManager;

        public MatchesController(QuestDbContext dbContext, UserManager<AppUser> userManager)
        {
            _DbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<List<Match>> GetMatchesAsync(MatchStatus status)
        {
            IQueryable<Match> query = _DbContext.Matches;

            if (status != MatchStatus.All)
                query = query.Where(m => m.Status == status);

            return await query.ToListAsync();

        }

    }
}
