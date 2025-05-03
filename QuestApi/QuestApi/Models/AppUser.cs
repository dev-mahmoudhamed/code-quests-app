using Microsoft.AspNetCore.Identity;

namespace QuestApi.Models
{
    public class AppUser : IdentityUser<int>
    {
        public string FullName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Playlist> Playlists { get; set; }
    }
}