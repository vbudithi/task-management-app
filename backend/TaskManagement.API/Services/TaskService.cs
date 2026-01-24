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

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync(int userId)
        {
            return await _context.Tasks
                .Where(t=>t.UserId==userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
        public async Task<TaskItem?> GetTaskByIdAsync(int userId, int taskId)
        {
            return await _context.Tasks
                   .Where(t => t.Id == taskId && t.UserId == userId)
                   .FirstOrDefaultAsync();
        }

        public async Task<TaskItem> CreateTaskAsync(CreateTaskDto createDto, int userId)
        {
            var task = new TaskItem
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Priority = createDto?.Priority,
                Status = createDto.Status ?? Models.TaskStatus.Todo,
                CreatedAt = DateTime.UtcNow,
                UserId= userId,
                DueDate =createDto.DueDate
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateTaskAsync(int userId, int taskId, UpdateTaskDto updateDto)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t=>t.Id==taskId && t.UserId ==userId);
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

            if (updateDto.DueDate.HasValue)
                task.DueDate = updateDto.DueDate.Value;

               task.UpdatedAt = DateTime.UtcNow;

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

        public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(int userId, Models.TaskStatus status)
        {
            return await _context.Tasks
                .Where(t =>t.UserId==userId && t.Status ==status)
                .OrderByDescending(t=> t.CreatedAt)
                .ToListAsync();
        }
    }
}