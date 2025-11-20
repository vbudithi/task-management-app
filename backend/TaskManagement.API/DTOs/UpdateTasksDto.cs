using System.ComponentModel.DataAnnotations;
using TaskManagement.API.Models;

namespace TaskManagement.API.DTOs
{
    public class UpdateTaskDto
    {
        [MaxLength(200)]
        public string? Title { get; set; }
        [MaxLength(100)]
        public string? Description { get; set; }
        public Models.TaskStatus? Status { get; set; }
        public int? Priority {  get; set; }
    }
}
