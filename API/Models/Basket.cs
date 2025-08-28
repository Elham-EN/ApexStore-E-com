

using Microsoft.AspNetCore.Mvc;

namespace API.Models
{
    public class Basket
    {
        public int Id { get; set; }
        // Store this value as cookie in user's browser
        public required string BasketId { get; set; }
        // One-to-many: One `Basket` can have many `BasketItem`
        public List<BasketItem> Items { get; set; } = [];

        // Store inside basket: Client use this to communicate directly with 
        // Stripe without our API involvement. We get client secret when we
        // create the payment intent.
        public string? ClientSecret { get; set; }

        // Store inside basket: when user's update their basket & come back to
        // checkout page, then we need to update the payment intent to let Stripe
        // know the new amount based on the changes they made in their basket
        public string? PaymentIntentId { get; set; }

        // Add Product Item to the Basket
        public void AddItem(Product product, int quantity)
        {
            // If product is null exit the method by throwing exception
            if (product == null)
            {
                // Throws an ArgumentNullException if argument is null
                ArgumentNullException.ThrowIfNull(product);
            }
            // Make sure quantity is not less than 0, must be positive
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity should be" +
                "greater than zero", nameof(quantity));
            }
            // Get Item, could already be in the basket or not (NULL)
            var existingItem = FindItem(product.Id);

            // Check: If existing item is not in the basket
            if (existingItem == null)
            {
                // Add Item to the List
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
            // If the item exist then just increase it's quantity 
            else
            {
                existingItem.Quantity += quantity;
            }
        }
        // Remove item from the basket
        public void RemoveItem(int productId, int quantity)
        {
            // Make sure quantity is not less than 0, must be positive
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity should be" +
                "greater than zero", nameof(quantity));
            }
            // Get Item, could already be in the basket or not (NULL)
            var existingItem = FindItem(productId);
            // If not in the basket, than exist this method
            if (existingItem == null) return;
            // Reduce the quantity of the item in the basket
            existingItem.Quantity -= quantity;
            // If the quantity of the item in the basket is 0, then 
            // remove the item from the basket
            if (existingItem.Quantity <= 0) Items.Remove(existingItem);
        }

        // Make it optional because it may or may not be already in the 
        // basket. Possibly return the basket item or NULL if not found
        private BasketItem? FindItem(int productId)
        {
            // It will find the first item that it matches if it exist in
            // the list of BasketItem or return the default value for
            // BasketItem (which is NULL) if does not exist in the basket
            return Items.FirstOrDefault(item => item.ProductId == productId);
        }
    }
}