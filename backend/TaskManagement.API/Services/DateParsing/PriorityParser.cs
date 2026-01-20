using TaskManagement.API.Models;

namespace TaskManagement.API.Services.DateParsing
{
    public static class PriorityParser
    {
        public static PriorityLevel ExtractPriorityFromText(string  text)
        {
            var lower = text.ToLower();

            if (lower.Contains("urgent") || lower.Contains("asap") || lower.Contains("critical"))
                return PriorityLevel.High;

            if (lower.Contains("later") || lower.Contains("whenever") )
                return PriorityLevel.Low;
            return PriorityLevel.Medium;
        }
    }
}
