using System.Text.Json.Serialization;

namespace TaskManagement.API.Models.HuggingFace
{
    public class NerEntity
    {
        [JsonPropertyName("entity_group")]
        public string EntityGroup { get; set; } = "";

        [JsonPropertyName("word")]
        public string Word { get; set; } = "";
        public float Score { get; set; }
        public int Start { get; set; }
        public int End { get; set; }

        [JsonPropertyName("parsed")]
        public string? Parsed { get; set; }
    }
}
