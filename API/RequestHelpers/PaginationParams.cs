namespace API.RequestHelpers;

public class PaginationParams
{
    // Sets maximum allowed items per page to prevent performance issues
    private const int MaxPageSize = 50;
    // Current page number, defaults to first page
    public int PageNumber { get; set; } = 1;
    // Private field to store the actual page size value
    private int _pageSize = 8; // Default Size of items per page
     // Property that controls how many items to show per page
    public int Pagesize
    {
        // Returns the stored page size value
        get => _pageSize;
        // Ensures page size never exceeds the maximum limit for performance
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}