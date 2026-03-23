using Microsoft.AspNetCore.Mvc;
using Verbenium.Game;

namespace Verbenium.Controllers;

[Route("/api")]
[ApiController]
public class StartingPointController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new GameNode
        {
            Description = "Welcome to Verbenium. More info coming soon.",
            Actions =
            [
                new() { Label = "Start", Url = "start" }
            ]
        });
    }

    [HttpGet("start")]
    public IActionResult GetUp()
    {
        return Ok(new GameNode
        {
            Description = "Okay, let's start: You wake up in a dark forest. What do you do?",
            Actions = 
            [
                new() { Label = "Check surroundings", Url = "check_surroundings" }
            ]
        });
    }

    [HttpGet("check_surroundings")]
    public IActionResult CheckSurroundings()
    {
        return Ok(new GameNode
        {
            Description = "You look around, and see a patch of mushrooms growing underneath a large tree. " +
            "You feel your stomach growl. The mushrooms look totally harmless.",
            Actions = 
            [
                new() { Label = "Eat the mushrooms", Url = "eat_mushrooms" },
                new() { Label = "Don't eat the mushrooms", Url = "dont_eat_mushrooms" }
            ]
        });
    }

    [HttpGet("eat_mushrooms")]
    public IActionResult EatMushrooms()
    {
        return Ok(new GameNode
        {
            Description = "You were wrong about the mushrooms. GAME OVER.",
            Actions = []
        });
    }

    [HttpGet("dont_eat_mushrooms")]
    public IActionResult DontEatMushrooms()
    {
        return Ok(new GameNode
        {
            Description = "Taking your eyes away from the mushrooms, you see a clearing in the distance.",
            Actions = []
        });
    }
}
