using System.Text.Json;
using API.RequestHelpers;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

public static class HttpExtension
{
    // Format as JSON Response. The static readonly ensures it's created 
    // once when the class first loads and never changes afterward.  
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        // converts C# PascalCase properties to camelCase for frontend 
        // compatibility
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
    public static void AddPaginationHeader(this HttpResponse response,
        PaginationMetadata metadata)
    {
        // Add pagination metadata to response header as JSON string 
        // for client to read
        response.Headers.Append("Pagination",
            JsonSerializer.Serialize(metadata, _jsonOptions));
        // Tell the browser it's allowed to access the custom "Pagination" 
        // header from JavaScript. By default, browsers block JavaScript 
        // from reading custom headers due to CORS security.    
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders,
            "Pagination");
    }
}