using TaskManagement.API.ML.Models;
namespace TaskManagement.API.ML.Training
{
    public static class BootstrapTrainer
    {
        public static void CreateStarterModel()
        {
            var rows = new List<TaskTrainingRow>
                    {
                        //Sample training data
                        // HIGH (3)
                        new() { Title = "Production outage", Description = "System down for all users", Label = 3 },
                        new() { Title = "Payment failure", Description = "Checkout not working", Label = 3 },
                        new() { Title = "Security breach", Description = "Unauthorized access detected", Label = 3 },

                        // MEDIUM (2)
                        new() { Title = "Sprint planning", Description = "Weekly team planning", Label = 2 },
                        new() { Title = "Backend refactor", Description = "Improve API structure", Label = 2 },
                        new() { Title = "Client follow up", Description = "Respond to client email", Label = 2 },

                        // LOW (1)
                        new() { Title = "UI color change", Description = "Minor styling update", Label = 1 },
                        new() { Title = "Update documentation", Description = "Fix typos in docs", Label = 1 },
                        new() { Title = "Rename button", Description = "Change label text", Label = 1 }
                    };


            TaskTrainer.Train(rows);
        }
    }
}
