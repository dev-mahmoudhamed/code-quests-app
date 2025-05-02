using Microsoft.AspNetCore.Identity;

namespace QuestApi.Models
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Playlist> Playlists { get; set; }
    }
}