using Microsoft.EntityFrameworkCore;

namespace API.Models.OrderAggregate
{
    public class OrderItem
    {
        public int Id { set; get; }
        public required ProductItemOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}