// A property is a class member that provides controlled access 
// to private fields with getter and setter methods.
namespace API.Models
{
    public class Product
    {
        // A property is a class member that provides controlled 
        // access to private fields with getter and setter methods.
        public int Id { get; set; }
        // Forces the property to be set during object creation
        public required string Name { get; set; }
        public required string Description { get; set; }
        // If Price property not initialize, than it will be provided 
        // With default value that is 0
        public long Price { get; set; }
        public required string PictureUrl { get; set; }
        public required string Type { get; set; }
        public required string Brand { get; set; }
        // INT type can't be null because it value type not reference type
        public int QuantityInStock { get; set; }
    }
}