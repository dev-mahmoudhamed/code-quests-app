using QuestApi.Models;

namespace QuestApi.Dtos
{
    public class MatchFilterInput
    {
        public MatchStatus MatchStatus { get; set; }
        public string? Filter { get; set; }
    }
}
