namespace TaskManagement.API.Models
{
    public class User:BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime {  get; set; }   

    }
}