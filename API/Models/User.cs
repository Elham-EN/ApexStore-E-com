using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        // One-to-One Relation: User can only have one address 
        // This is optional because when user sign up, they don't
        // need to provide their address that is only for checkout 
        public int? AddressId { get; set; }
        public Address? Address { get; set; }
    }
}