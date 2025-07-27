using API.Models;

namespace API.Extensions;

public static class ProductExtension
{
    // Extension Method
    public static IQueryable<Product> Sort(this IQueryable<Product> query,
        string? orderBy)
    {
        // SORTING Functionality
        query = orderBy switch
        {
            // Sort from lowest price to higest price
            "price" => query.OrderBy(x => x.Price),
            // Sort from higest price to lowest price
            "priceDesc" => query.OrderByDescending(x => x.Price),
            // Default option: Sort by product name
            _ => query.OrderBy(x => x.Name)
        };
        return query;
    }
}