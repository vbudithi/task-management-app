using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.ML.Models;

namespace TaskManagement.API.ML.Services
{
    public class MLService : IMLService
    {

        private readonly AppDbContext _context;
        public MLService(AppDbContext context)
        {
            _context = context;
        }
        public async Task TrainModelAsync()
        {
            var rows = await _context.Tasks
                .Where(t => t.IsLabeled &&t.Priority >= 1 && t.Priority <= 3) // Only valid labels
                .Select(t => new TaskTrainingRow
                {
                    Title = t.Title,
                    Description = t.Description,
                    Label = t.Priority.Value
                })
                .ToListAsync();

            if (rows.Count < 10)
                throw new Exception("Not enough labeled data to train ML model");
            Console.WriteLine("=== TRAINING SAMPLE ===");
            foreach (var r in rows.Take(10))
            {
                Console.WriteLine($"{r.Label} | {r.Title}");
            }
            Console.WriteLine($"TOTAL ROWS: {rows.Count}");

            TaskTrainer.Train(rows);
        }


        public async Task<int> PredictPriorityAsync(string title, string description)

        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required");

            if (string.IsNullOrWhiteSpace(description))
                description = string.Empty;

            var input = new TaskInput
            {
                Title = title,
                Description = description??string.Empty
            };
           

            var prediction = TaskPredictor.Predict(input);
            Console.WriteLine("RAW ML OUTPUT: " + prediction.PredictedLabel);
            var ai = prediction.PredictedLabel;
            if (ai < 1 || ai > 3)
            {
                Console.WriteLine("AI returned invalid priority, defaulting to Medium");
                ai = 2;
            }

            return ai;

        }
    }
}
