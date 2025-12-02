using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QuestApi.Dtos;
using QuestApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userMgr;
        private readonly IConfiguration _config;

        public AuthController(UserManager<AppUser> userMgr, IConfiguration config)
        {
            _userMgr = userMgr;
            _config = config;
        }

        [HttpPost("register"), AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new AppUser
            {
                FullName = dto.FullName,
                UserName = dto.Email,
                Email = dto.Email
            };
            var res = await _userMgr.CreateAsync(user, dto.Password);
            if (!res.Succeeded) return BadRequest(res.Errors);
            return NoContent();
        }

        [HttpPost("login"), AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userMgr.FindByEmailAsync(dto.Email);
            if (user == null || !await _userMgr.CheckPasswordAsync(user, dto.Password))
                return Unauthorized();

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        [HttpPost("google-login"), AllowAnonymous]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            try
            {
                var settings = new Google.Apis.Auth.GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { _config["Authentication:Google:ClientId"] }
                };

                var payload = await Google.Apis.Auth.GoogleJsonWebSignature.ValidateAsync(dto.IdToken, settings);

                var user = await _userMgr.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new AppUser
                    {
                        Email = payload.Email,
                        UserName = payload.Email,
                        FullName = payload.Name
                    };

                    var result = await _userMgr.CreateAsync(user);
                    if (!result.Succeeded) return BadRequest(result.Errors);
                }

                var token = GenerateJwtToken(user);
                return Ok(new { token });
            }
            catch (Google.Apis.Auth.InvalidJwtException)
            {
                return Unauthorized("Invalid Google Token");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GenerateJwtToken(AppUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Name, user.FullName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = creds,
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }
    }

}
