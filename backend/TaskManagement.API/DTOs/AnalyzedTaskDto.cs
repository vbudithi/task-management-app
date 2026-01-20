namespace TaskManagement.API.DTOs
{
    public class AnalyzedTaskDto
    {
        public CreateTaskDto Task { get; set; }
        public AiTaskInsightsDto AiInsights { get; set; }
    }
}
