using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.DTOs
{
    public class UpdateTaksDto
    {
        [MaxLength(200)]
        public string? Title { get; set; }
        [MaxLength(100)]
        public string? Description { get; set; }
        public TaskStatus? Status { get; set; }
        public int? Priority {  get; set; }
    }
}
