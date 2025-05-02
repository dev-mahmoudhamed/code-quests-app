using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuestApi.Models
{
    public class Match
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MatchId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Competition { get; set; } = string.Empty;

        [Required]
        public DateTime DateUtc { get; set; }

        [Required]
        public MatchStatus Status { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

    }

    public enum MatchStatus
    {
        Live,
        Replay
    }
}
