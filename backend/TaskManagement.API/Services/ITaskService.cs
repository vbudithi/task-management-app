using TaskManagement.API.DTOs;
using TaskManagement.API.Models;    

namespace TaskManagement.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync(int userId);
        Task<TaskItem?>GetTaskByIdAsync(int userId, int taskId);
        Task<TaskItem> CreateTaskAsync(CreateTaskDto createDto, int userId);
        Task<TaskItem?> UpdateTaskAsync(int userId, int taskId, UpdateTaskDto updateDto);
        Task<bool> DeleteTaskAsync(int id);
        Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(Models.TaskStatus status);
    }
}
