namespace API.RequestHelpers;

// Return pagination information to the client, to allow 
// client to organize UI around this information
public class PaginationMetadata
{
    // Total number of products that match the query criteria 
    // in the DB before pagination is applied    
    public int TotalCount { get; set; }
    // Number of items displayed per page
    public int PageSize { get; set; }
    // The current page number being displayed (1-based)
    public int CurrentPage { get; set; }
    // Total number of pages available based on TotalCount & PageSize
    public int TotalPages { get; set; }
}