using TaskManagement.API.DTOs;

namespace TaskManagement.API.Services
{
    public interface ITaskAiService
    {
        Task<AiTaskInsightsDto> AnalyzeDescriptionAsync(string description);
    }
}
