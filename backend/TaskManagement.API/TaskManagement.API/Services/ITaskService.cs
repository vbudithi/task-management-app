using TaskManagement.API.DTOs;
using TaskManagement.API.Models;    

namespace TaskManagement.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem?>GetTaskByIdAsync(int id);
        Task<TaskItem> CreateTaskAsync(CreateTaskDto createDto);
        Task<TaskItem?> UpdateTaskAsync(int id, UpdateTaskDto updateDto);
        Task<bool> DeleteTaskAsync(int id);
        Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(Models.TaskStatus status);
    }
}
