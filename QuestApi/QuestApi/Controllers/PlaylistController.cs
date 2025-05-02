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
    public class PlaylistController : ControllerBase
    {
        private readonly QuestDbContext _DbContext;
        private readonly UserManager<AppUser> _userManager;

        public PlaylistController(QuestDbContext db, UserManager<AppUser> userManager)
        {
            _DbContext = db;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<List<Match>> GetUserPlaylist()
        {
            var userId = (await GetCurrentUser()).Id;

            var playLists = await _DbContext.Playlists
                .Where(p => p.UserId == userId)
                .Include(p => p.Match)
                .Select(p => p.Match)
                .ToListAsync();

            return playLists;
        }

        [HttpPost("{matchId:int}")]
        public async Task AddToPlaylist(int matchId)
        {
            var userId = (await GetCurrentUser()).Id;

            var playlistItem = new Playlist { UserId = userId, MatchId = matchId };
            await _DbContext.Playlists.AddAsync(playlistItem);
            await _DbContext.SaveChangesAsync();
        }

        [HttpDelete("{matchId:int}")]
        public async Task RemoveFromPlaylist(int matchId)
        {
            var userId = (await GetCurrentUser()).Id;

            var playlistItem = _DbContext.Playlists.FirstOrDefault(p => p.UserId == userId && p.MatchId == matchId);
            if (playlistItem != null)
            {
                _DbContext.Playlists.Remove(playlistItem);
                await _DbContext.SaveChangesAsync();
            }
        }

        private async Task<AppUser> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? throw new UnauthorizedAccessException("UserId not Found");

            var user = await _userManager.FindByIdAsync(userId)
                ?? throw new UnauthorizedAccessException("User not authenticated");

            return user;
        }
    }
}
