

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorTestController : BaseApiController
    {
        // The server cannot find the requested resource (HTTP 404)
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }
        // The server cannot or will not process the request due to a 
        // client error (HTTP 400 - client bad request)
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is not a good request");
        }

        // Client request failed because it lacked valid authentication 
        // credentials for the requested resource (HTTP 401)
        [HttpGet("unauthorized")]
        public IActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
        // 400 bad request error with structured validation format
        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1",
                "This is the first error");
            // Returns: { "errors": { "Problem": ["This is the first error"] } } 
            return ValidationProblem();
        }
        // The server is having trouble fulfilling a client's request. These 
        // errors suggest a problem on the server-side. (HTTP 500 internal error)
        [HttpGet("server-error")]
        public IActionResult GetUServerError()
        {
            // The controller doesn't return a response at all. Instead, it 
            // throws an exception
            throw new Exception("This is a server error");
        }        
    }
}