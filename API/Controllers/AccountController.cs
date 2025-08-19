using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<User> _signInManager;
        public AccountController(SignInManager<User> signInManager)
        {
            this._signInManager = signInManager;
        }
        // Send HTTP Response without response data
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                PasswordHash = registerDto.Password
            };
            // Create a user
            var result = await _signInManager
                .UserManager
                .CreateAsync(user, registerDto.Password);
            // Identity validation failed (e.g., weak password, duplicate email)
            if (!result.Succeeded)
            {
                // Loop through Identity errors and add each to ModelState
                foreach (var error in result.Errors)
                {
                    // ModelState is ASP.NET Core's built-in validation system that tracks:
                    // - Validation errors for each property in your model
                    // - User input values that failed validation
                    // Think of it as a "validation report card" for incoming data.
                    // AddModalError: Manually adds validation errors to ModelState when 
                    // automatic validation isn't enough.
                    ModelState.AddModelError(error.Code, error.Description);
                }
                // ModelState integrates with ValidationProblem() to creates a 400 Bad 
                // Request with all errors
                return ValidationProblem();
            }
            // Add the specified user to the named role.
            await this._signInManager.UserManager.AddToRoleAsync(user, "Member");
            return Ok();
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (User.Identity?.IsAuthenticated == false) return NoContent();

            var user = await this._signInManager.UserManager.GetUserAsync(User);

            if (user == null) return Unauthorized();
            // Gets a list of role names the specified user belongs to.
            var roles = await this._signInManager.UserManager.GetRolesAsync(user);

            return Ok(new
            {
                user.Email,
                user.UserName,
                Roles = roles
            });
        }

        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            // Server-side remove the cookies from user's browser
            await this._signInManager.SignOutAsync();
            return NoContent();
        }

        [Authorize] // only authenticated users can access this endpoint.
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            // Query the database for the currently authenticated user:
            var user = await this._signInManager.UserManager.Users
                // user's Address navigation property is loaded
                .Include(x => x.Address)
                // User.Identity!.Name gets the username of the logged-in user 
                // from cookies
                .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);

            if (user == null) return Unauthorized();

            // If no address exists, assign the new one
            user.Address = address;

            var result = await this._signInManager.UserManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem with system");

            return Ok(user.Address);
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetSavedAddress()
        {
            var address = await this._signInManager.UserManager.Users
                .Where(x => x.UserName == User.Identity!.Name)
                .Select(x => x.Address)
                .FirstOrDefaultAsync();

            if (address == null) return NoContent();

            return address;
        }
    }
}