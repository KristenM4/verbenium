using Microsoft.AspNetCore.Mvc;

namespace Verbenium.Controllers;

[Route("")]
[ApiController]
public class StartingPointController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            description = "Welcome to Verbenium. Go to /start to begin.",
            actions = Array.Empty<string>()
        });
    }

    [HttpGet("start")]
    public IActionResult GetUp()
    {
        return Ok(new
        {
            description = "Okay, let's start: You wake up in a dark forest. What do you do?",
            actions = new[] { "check surroundings" }
        });
    }

    [HttpGet("check_surroundings")]
    public IActionResult CheckSurroundings()
    {
        return Ok(new
        {
            description = "You look around, and see a patch of mushrooms growing underneath a large tree. " +
            "You feel your stomach growl. The mushrooms look totally harmless.",
            actions = new[] { "eat the mushrooms", "don't eat the mushrooms" }
        });
    }

    [HttpGet("eat_mushrooms")]
    public IActionResult EatMushrooms()
    {
        return Ok(new
        {
            description = "You were wrong about the mushrooms. GAME OVER.",
            actions = Array.Empty<string>()
        });
    }

    [HttpGet("dont_eat_mushrooms")]
    public IActionResult DontEatMushrooms()
    {
        return Ok(new
        {
            description = "Taking your eyes away from the mushrooms, you see a clearing in the distance.",
            actions = Array.Empty<string>()
        });
    }
}
