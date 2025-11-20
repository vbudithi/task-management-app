using Microsoft.AspNetCore.Mvc;
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

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        //GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<TaskItem>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);

        }

        //Get:api/tasks/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTasks(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound(new { message = $"Task with id {id} not found" });

            return Ok(task);
        }

        // GET: api/tasks/status/todo
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksByStatus(Models.TaskStatus status)
        {
            var tasks = await _taskService.GetTasksByStatusAsync(status);
            return Ok(tasks);
        }

        //POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] CreateTaskDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _taskService.CreateTaskAsync(createDto);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);

        }

        //PUT: api/tasks/id
        [HttpPut("{id}")]
        public async Task<ActionResult<TaskItem>> UpdateTask(int id, [FromBody] UpdateTaskDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _taskService.UpdateTaskAsync(id, updateDto);

            if (task == null)
                return NotFound(new { message = $"Task with id {id} not found" });
            return Ok(task);
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
    }
}