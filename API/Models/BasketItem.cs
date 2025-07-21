

namespace API.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        // `BasketItem` has one `Product` & `Product` belongs to a 
        // single `BasketItem`. (One-to-One Rel)
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        // Each `BasketItem` is associated with only one `Basket`
        // But a `Basket` can have many `BasketItem`(One-to-Many Rel)
        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null!; // Set Requried
    }
}