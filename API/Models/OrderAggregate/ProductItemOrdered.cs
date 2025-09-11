using Microsoft.EntityFrameworkCore;

namespace API.Models.OrderAggregate
{
    // Order have one-to-many relationship with an order item
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        // This guarantees that Name and Picture will always have a 
        // value when a ProductItemOrdered object is instantiated.
        public required string Name { get; set; }
        public required string Picture { get; set; }
    }
}