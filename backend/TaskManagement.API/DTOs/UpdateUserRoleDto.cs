using TaskManagement.API.Models;

namespace TaskManagement.API.DTOs
{
    public class UpdateUserRoleDto
    {
        public int Id { get; set; }
        public UserRole Role { get; set; }
    }
}
