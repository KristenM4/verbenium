namespace Verbenium.server.Data;

using Microsoft.EntityFrameworkCore;
using Verbenium.server.Game;

public class AppDbContext : DbContext
{
    public DbSet<GameNode> GameNodes { get; set; }
    public DbSet<GameAction> GameActions { get; set; }
    public DbSet<GameObject> GameObjects { get; set; }
    public DbSet<GameObjectPlacement> GameObjectPlacements { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
