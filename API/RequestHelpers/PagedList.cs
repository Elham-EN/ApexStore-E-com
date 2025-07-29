using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

// A new version of a List, that contains pagination information
// We have a paginated list of type product <T>. This class will
// have all of the List functionality and in addition to that 
// the pagination information as well
public class PagedList<T> : List<T>
{
    // Contains pagination information
    public PaginationMetadata Metadata { get; set; }
    // Creates a paged list with items and calculates pagination metadata
    public PagedList(List<T> items, int count, int pageNumber,
        int pageSize)
    {
        // Create metadata object with pagination information
        Metadata = new PaginationMetadata
        {
            // Total number of items before pagination
            TotalCount = count,
            // Items per page
            PageSize = pageSize,
            // Current page number
            CurrentPage = pageNumber,
            // Calculate total pages by dividing count by page size 
            // and rounding up
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        // Add the paginated items to this list
        AddRange(items);
    }
    // Converts an IQueryable into a PagedList with pagination applied
    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,
        int pageNumber, int pageSize)
    {
        // Get total number of items from the DB that match the query 
        // before pagination
        var count = await query.CountAsync();
        // Apply pagination to get only the items for the current page
        var items = await query
        // Tell EF, how many records to skip based on the page number
        // and the page size
            .Skip((pageNumber - 1) * pageSize)
        // How many items do we wish to take. 
            .Take(pageSize)
        // Return all products as a list from the DB after pagination
            .ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}


// Pagination Logic
// Scenario 1: I want to see page 1 with 4 products per page:
// Skip: (1 (pageNumber) - 1) * 4 (pageSize - items per page)
// Skip: 0 * 4 = 0 => Skip 0 products (don't skip any)
// Take "Give me the next 4 products" (products 1,2,3,4)

// Scenario 2: I want to see page 2 with 4 products per page:
// Skip: (2 (pageNumber) - 1) * 4 (pageSize - items per page)
// Skip: 1 * 4 = 4 => Skip 4 products
// Take "Give me the next 4 products" (products 5,6,7,8)

// Example:
// 23 items, 10 per page
// Without (double): 23 / 10 = 2 (wrong - truncated)
// With (double): 23 / 10.0 = 2.3
// After Math.Ceiling(): 3.0
// After (int): 3 (correct - need 3 pages total)