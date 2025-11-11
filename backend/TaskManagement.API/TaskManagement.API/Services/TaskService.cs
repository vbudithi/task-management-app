using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;

namespace TaskManagement.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<TaskItem> CreateTaskAsync(CreateTaskDto createDto)
        {
            var task = new TaskItem
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Priority = createDto.Priority,
                Status = Models.TaskStatus.Todo,
                CreatedAt = DateTime.UtcNow
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateTaskAsync(int id, UpdateTasksDto updateDto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) 
                return null;

            //only update provided fields
            if(!string.IsNullOrWhiteSpace(updateDto.Title))
                task.Title = updateDto.Title;
            if(updateDto.Description != null)
                task.Description = updateDto.Description;

            if(updateDto.Status.HasValue)
            {
                task.Status = updateDto.Status.Value;
                if (task.Status==Models.TaskStatus.Completed )
                    task.CompletedAt = DateTime.UtcNow;
            }
            if(updateDto.Priority.HasValue)
                task.Priority = updateDto.Priority.Value;
            

            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(Models.TaskStatus status)
        {
            return await _context.Tasks
                .Where(t =>t.Status == status)
                .OrderByDescending(t=> t.CreatedAt)
                .ToListAsync();
        }

      
    }
}
