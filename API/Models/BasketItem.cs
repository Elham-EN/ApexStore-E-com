using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        // Unidirectional Navigation Properties
        // You query from BasketItem → Product direction only
        // `BasketItem` has one `Product` & `Product` belongs to a 
        // single `BasketItem`. (One-to-One Rel)
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        // Each `BasketItem` is associated with only one `Basket`
        // But a `Basket` can have many `BasketItem`(One-to-Many Rel)
        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null!; // Set Requried
    }
}