namespace TaskManagement.API.DTOs
{
    public class RefreshRequestDto
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
    }
}
