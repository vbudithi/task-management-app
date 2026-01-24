namespace TaskManagement.API.ML.Models
{
    public class TaskInput
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Label { get; set; } = 0;
    }
}
