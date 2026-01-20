using TaskManagement.API.Models;

namespace TaskManagement.API.DTOs
{
    public class AiTaskInsightsDto
    {
        public DateTime? SuggestedDueDate { get; set; }
        public PriorityLevel SuggestedPriority { get; set; } =PriorityLevel.Medium;
    }
}
