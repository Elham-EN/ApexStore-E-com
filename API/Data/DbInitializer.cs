using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// Adding Seed Data to populate the database with dummy data
public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        // Creates a service scope with automatic resource cleanup.
        /// The 'using' statement ensures that services (like DbContext) 
        /// are properly disposed immediately after use, rather than waiting 
        /// for garbage collection. This prevents memory leaks and ensures 
        /// database connections are closed promptly.
        using var scope = app.Services.CreateScope();
        // Get the StoreContext (database context) from the dependency 
        // injection container & ensuring we have a valid database connection 
        // to work with.
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve store context");
        // Get the UserManager from the DI container
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager");

        await SeedData(context, userManager);
    }

    // Seeds the database with initial data if it's empty.
    private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        // Apply pending database migrations
        context.Database.Migrate();

        // Check if we have user in the db after db migrated
        if (!userManager.Users.Any())
        {
            // Create New Member User if Does Not Exist in the DB 
            var user = new User
            {
                UserName = "bob@test.com",
                Email = "bob@test.com"
            };
            await userManager.CreateAsync(user, "Pa$$w0rd");
            // Assign Authorization role to the user
            await userManager.AddToRoleAsync(user, "Member");

            // Create New Member User if Does Not Exist in the DB 
            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            // Assign Authorization roles to the user
            await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
        }

        // Exit if products already exist (avoid duplicates)
        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            new() {
                Name = "Frieza Fourth Form",
                Description = "Galactic tyrant in his most feared transformation. Detailed figure captures the menacing power of Frieza's final form.",
                Price = 4599,
                PictureUrl = "/images/products/frieza-fourth-form.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Gaara of the Sand",
                Description = "Fifth Kazekage with signature gourd. Premium collectible showcasing Gaara's mastery over sand manipulation.",
                Price = 3899,
                PictureUrl = "/images/products/gaara-sand.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Itachi Uchiha",
                Description = "Legendary ANBU member and Akatsuki operative. Highly detailed figure of the Uchiha prodigy with Sharingan.",
                Price = 4299,
                PictureUrl = "/images/products/itachi.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Kakashi Hatake",
                Description = "Copy Ninja of the Hidden Leaf. Iconic figure featuring the legendary Sixth Hokage in his signature pose.",
                Price = 3999,
                PictureUrl = "/images/products/kakashi.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Majin Buu",
                Description = "Ancient magical entity of pure destruction. Collectible showcasing the fearsome pink terror of the universe.",
                Price = 4199,
                PictureUrl = "/images/products/majin-buu.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Minato Namikaze",
                Description = "Yellow Flash of the Hidden Leaf. Premium figure of the Fourth Hokage with Flying Thunder God technique.",
                Price = 4499,
                PictureUrl = "/images/products/minato-namikaze.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Monkey D. Luffy Special Edition",
                Description = "Future Pirate King in action pose. Limited edition figure of the Straw Hat captain with Gear abilities.",
                Price = 4799,
                PictureUrl = "/images/products/monkey-d-luffy-special-edition.jpg",
                Brand = "One Piece",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Obito Uchiha",
                Description = "Masked man behind the Fourth Shinobi War. Detailed collectible featuring dual Sharingan and Rinnegan.",
                Price = 4399,
                PictureUrl = "/images/products/obito-uchiha.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Red Hair Shanks",
                Description = "Emperor of the Sea and Luffy's inspiration. Premium figure of one of the most powerful pirates.",
                Price = 4999,
                PictureUrl = "/images/products/red-hair-shanks.jpg",
                Brand = "One Piece",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Roronoa Zoro",
                Description = "Three-sword style master swordsman. Iconic figure of the Straw Hat crew's first mate in battle stance.",
                Price = 4299,
                PictureUrl = "/images/products/roronoa-zoro.jpg",
                Brand = "One Piece",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Sasuke Special Edition",
                Description = "Last Uchiha survivor with Rinnegan. Limited edition collectible featuring advanced dojutsu abilities.",
                Price = 4699,
                PictureUrl = "/images/products/sasuke-special-edition.jpg",
                Brand = "Naruto",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Super Saiyan 3 Son Goku",
                Description = "Ultimate Saiyan transformation with flowing golden hair. Detailed figure capturing SS3 Goku's raw power.",
                Price = 4899,
                PictureUrl = "/images/products/super-saiyan-3-son-goku.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Super Saiyan Black Goku",
                Description = "Divine warrior with twisted justice. Premium collectible of Zamasu in Goku's body with rosé aura.",
                Price = 4799,
                PictureUrl = "/images/products/super-saiyan-black-goku.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Super Saiyan Broly Full Power",
                Description = "Legendary Super Saiyan at maximum strength. Massive figure showcasing Broly's unstoppable berserker form.",
                Price = 4999,
                PictureUrl = "/images/products/super-saiyan-broly-full-power.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Super Saiyan God Son Goku",
                Description = "Divine ki-infused warrior with crimson aura. Collectible featuring Goku's godly transformation.",
                Price = 4699,
                PictureUrl = "/images/products/super-saiyan-god-son-goku.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Ultimate Gohan",
                Description = "Mystic power unlocked by Elder Kai. Premium figure of Gohan at his absolute peak potential.",
                Price = 4399,
                PictureUrl = "/images/products/super-saiyan-ultimate-gohan.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Super Saiyan Vegeta",
                Description = "Saiyan Prince in iconic golden transformation. Classic collectible of Vegeta's legendary power-up.",
                Price = 4499,
                PictureUrl = "/images/products/super-saiyan-vegeta.jpg",
                Brand = "Dragon Ball",
                Type = "Figures",
                QuantityInStock = 50
            },
            new() {
                Name = "Whitebeard Pirate",
                Description = "Strongest man in the world and legendary captain. Epic figure of Edward Newgate with his bisento.",
                Price = 4999,
                PictureUrl = "/images/products/whitebaeard-pirate.jpg",
                Brand = "One Piece",
                Type = "Figures",
                QuantityInStock = 50
            },
        };

        // Save the changes to the database
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
