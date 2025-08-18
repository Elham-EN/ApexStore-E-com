using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
    }
}