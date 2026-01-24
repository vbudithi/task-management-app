using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.ML.Models;
using TaskManagement.API.ML.Services;

namespace TaskManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLController: ControllerBase
    {
        private readonly IMLService _mlService;

        public MLController(IMLService mlService)
        {
            _mlService= mlService;
        }
        [HttpPost("test")]
        public IActionResult TestModel()
        {
            var tests = new[]
            {
                new TaskInput { Title = "Production outage", Description = "System down" },
                new TaskInput { Title = "UI color change", Description = "Minor visual tweak" },
                new TaskInput { Title = "Security breach", Description = "Unauthorized access detected" }
    };

            foreach (var t in tests)
            {
                var p = TaskPredictor.Predict(t);
                Console.WriteLine($"{t.Title} => {p.PredictedLabel}");
            }

            return Ok("Check console output");
        }

        [HttpPost("train")]
        public async Task <IActionResult>Train()
        {
            try
            {
                await _mlService.TrainModelAsync();
                return Ok(new { message = "ML model trained successfully" });
            }
            catch (Exception ex) {
                return BadRequest(new { ex.Message });
            }
        }
      
    }
}
