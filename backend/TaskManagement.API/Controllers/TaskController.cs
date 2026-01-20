using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;
using TaskManagement.API.Services;

namespace TaskManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ITaskAiService _taskAiService;
        private readonly AppDbContext _db;

        public TaskController(AppDbContext db, ITaskService taskService, ITaskAiService taskAiService)
        {
            _taskService = taskService;
            _db = db;
            _taskAiService = taskAiService;
        }

        //GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<TaskItem>> GetAllTasks()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim);
            var tasks = await _taskService.GetAllTasksAsync(userId);
            return Ok(tasks);

        }

        //Get:api/tasks/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTasks(int id)
        {

            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim);
            var task = await _taskService.GetTaskByIdAsync(userId, id);

            if (task == null)
                return NotFound(new { message = $"Task with id {id} not found or access denied" });

            return Ok(task);
        }

        // GET: api/tasks/status/todo
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksByStatus(Models.TaskStatus status)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var tasks = await _taskService.GetTasksByStatusAsync(userId, status);
            return Ok(tasks);
        }

        //POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] CreateTaskDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var task = new TaskItem
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Priority = createDto.Priority,
                Status = createDto.Status ?? Models.TaskStatus.Todo,
                CreatedAt = DateTime.UtcNow,
                UserId = int.Parse(userId),
                DueDate = createDto.DueDate
            };

            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();

            return Ok(task);

        }

        //PUT: api/tasks/id
        [HttpPut("{id}")]
        public async Task<ActionResult<TaskItem>> UpdateTask(int id, [FromBody] UpdateTaskDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return BadRequest(ModelState);

            var userId = int.Parse(userIdClaim);

            var task = await _taskService.UpdateTaskAsync(userId, id, updateDto);

            if (task == null)
                return NotFound(new { message = "Task not found or access denied" });

            return Ok(new
            {
                message = "Task Updated Successfully",
                task = new
                {
                    task.Id,
                    task.Title,
                    task.Description,
                    task.Priority,
                    task.Status,
                    task.CreatedAt,
                    task.DueDate,
                    task.UpdatedAt
                }
            });
        }

        //DELETE:api/tasks/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskItem>> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(id);

            if (!result)
                return NotFound(new { message = $"Task with id {id} not found" });
            return Ok(result);

        }

        [HttpPost("analyze")]
        public async Task<ActionResult<AnalyzedTaskDto>> AnalyzeTask([FromBody] CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Description))
                return BadRequest("Description is required for AI analysis.");

            var insights = await _taskAiService.AnalyzeDescriptionAsync(dto.Description);


            dto.Priority = dto.Priority == 0 || dto.Priority == null ? (int)insights.SuggestedPriority : dto.Priority;

            //AI suggestions when user didn't provide values
            dto.DueDate = dto.DueDate == null ? insights.SuggestedDueDate : dto.DueDate;

            return Ok(new AnalyzedTaskDto
            {
                Task = dto,
                AiInsights = insights
            });
        }
    }
}