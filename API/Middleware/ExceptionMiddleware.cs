
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    // Custom Middleware: to handle all unhandled exceptions that occurs 
    // anywhere in the applications. It intercepts every exceptions and 
    // transform it into a standardized JSON Response for API consumption.
    public class ExceptionMiddleware : IMiddleware
    {
        // To determine whether the application is running in dev or prod
        private readonly IHostEnvironment _env;
        // Structured logging of exceptions
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(IHostEnvironment env,
            ILogger<ExceptionMiddleware> logger)
        {
            this._env = env;
            this._logger = logger;
        }
        // The heart of the middleware lies in its `InvokeAsync` method
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            // there's no logic before calling `next(context)` in this middleware
            try
            {
                // allow the request to flow through all downstream middleware 
                // and controllers
                await next(context);
            }
            // Exception handling middleware typically doesn't need to modify or 
            // examine the incoming request. Its job is purely to provide a 
            // safety net for the response journey
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }
        // Transform an error scenario into a structured, client-friendly response:
        private async Task HandleException(HttpContext context, Exception ex)
        {
            // Log Error (to help monitor application)
            this._logger.LogError(ex, ex.Message);

            // The middleware then takes control of the HTTP response by setting 
            // the content type to JSON and the status code to 500 
            // (Internal Server Error) before sending to the client
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // Create a standardized error response object for HTTP 500
            var response = new ProblemDetails // Object Initialization
            {
                Status = 500,
                // In dev, it provide detailed stack traces while in prod hide
                // sensitive implementation details for security
                Detail = this._env.IsDevelopment() ? ex.StackTrace?.ToString()
                    : null,
                Title = ex.Message
            };

            // Configure JSON serialization to use camelCase naming convention
            var options = new JsonSerializerOptions
            {
                // This converts C# PascalCase properties (e.g., "FirstName") 
                // to JavaScript-style camelCase in JSON output (e.g., "firstName")
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            // Convert the ProblemDetails error response object to JSON string
            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}