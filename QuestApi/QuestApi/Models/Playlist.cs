namespace QuestApi.Models
{
    public class Playlist
    {
        public int UserId { get; set; }

        public int MatchId { get; set; }

        public AppUser User { get; set; }
        public Match Match { get; set; }
    }
}
