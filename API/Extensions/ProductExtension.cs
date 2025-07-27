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

    public static IQueryable<Product> Search(this IQueryable<Product> query,
        string? searchTerm)
    {
        // Return query without doing anything if search term is null
        if (string.IsNullOrEmpty(searchTerm)) return query;
        // Convert search term to lowercase & remove whitespace
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
        // Return any products that match the search terms
        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
    }
}