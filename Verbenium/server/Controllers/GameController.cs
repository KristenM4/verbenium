using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verbenium.server.Data;

namespace Verbenium.Controllers;

[Route("/api")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly AppDbContext _db;

    public GameController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public Task<IActionResult> GetRoot() => GetNode("/");

    [HttpGet("{slug}")]
    public Task<IActionResult> GetBySlug(string slug) => GetNode(slug);

    private async Task<IActionResult> GetNode(string slug)
    {
        var node = await _db.GameNodes
            .Include(n => n.Actions)
            .FirstOrDefaultAsync(n => n.Url == slug);

        return node is null ? NotFound() : Ok(node);
    }
}
