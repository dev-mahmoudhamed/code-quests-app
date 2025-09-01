using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace QuestApi.Controllers
{
    [ApiController]
    [Route("api/Redis")]
    public class RedisCacheController : ControllerBase
    {
        private readonly IDatabase _db;

        public RedisCacheController(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }

        [HttpGet("set")]
        public async Task<IActionResult> Set(string key, string value, TimeSpan? expiry = null)
        {
            await _db.StringSetAsync(key, value, expiry);
            return Ok("Value set in Redis");
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get(string key)
        {
            var value = await _db.StringGetAsync(key);
            return Ok(value.ToString() ?? "Not found");
        }


    }
}
