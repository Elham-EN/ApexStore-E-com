
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    // Receive the props in the body of the request
    public class RegisterDto
    {
        // ASP.NET Core automatically validates incoming data against:
        // Data annotations ([Required], [EmailAddress], etc.)
        [Required]
        public string Email { get; set; } = string.Empty;

        public required string Password { get; set; }
    }
}