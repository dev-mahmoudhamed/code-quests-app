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
    [Authorize]
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
        public async Task<ApiResponse<bool>> AddToPlaylist(int matchId)
        {
            try
            {
                var userId = (await GetCurrentUser()).Id;

                var playlistItem = new Playlist { UserId = userId, MatchId = matchId };
                await _DbContext.Playlists.AddAsync(playlistItem);
                await _DbContext.SaveChangesAsync();

                var result = new ApiResponse<bool>
                {
                    StatusCode = 200,
                    Message = "Successfully added to playlist",
                    Data = true
                };
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpDelete("{matchId:int}")]
        public async Task<ApiResponse<bool>> RemoveFromPlaylist(int matchId)
        {
            try
            {
                var userId = (await GetCurrentUser()).Id;

                var playlistItem = new Playlist { UserId = userId, MatchId = matchId };
                if (playlistItem != null)
                {
                    _DbContext.Playlists.Remove(playlistItem);
                    await _DbContext.SaveChangesAsync();
                }

                var result = new ApiResponse<bool>
                {
                    StatusCode = 200,
                    Message = "Successfully removed from playlist",
                    Data = true
                };
                return result;

            }
            catch (Exception ex)
            {
                throw;
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
