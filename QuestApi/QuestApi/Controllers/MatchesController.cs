using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestApi.Data;
using QuestApi.Models;
using System.Security.Claims;

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
            var matches = await _DbContext.Matches.Where(m => m.Status == status).ToListAsync();
            return matches;
        }

        //    [HttpPost, Authorize]
        //    public async Task<Match> CreateMatchAsync(Match match)
        //    {
        //        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //        if (userId == null)
        //            throw new UnauthorizedAccessException();

        //        var user = await _userManager.FindByIdAsync(userId);
        //        if (userId == null)
        //            throw new UnauthorizedAccessException();

        //        var entity = await _DbContext.Matches.AddAsync(match);
        //        await _DbContext.SaveChangesAsync();
        //        return entity.Entity;
        //    }

        //    [HttpDelete("{id}")]
        //    public async Task DeleteMatchAsync(int id)
        //    {
        //        var match = new Match { MatchId = id };
        //        _DbContext.Matches.Remove(match);
        //        await _DbContext.SaveChangesAsync();
        //    }

    }
}
