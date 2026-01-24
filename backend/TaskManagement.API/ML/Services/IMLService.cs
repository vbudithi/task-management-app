namespace TaskManagement.API.ML.Services
{
    public interface IMLService
    {
        Task TrainModelAsync();
        Task<int> PredictPriorityAsync(string title, string description);
    }
}
