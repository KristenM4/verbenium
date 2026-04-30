namespace Verbenium.server.Data;

using Verbenium.server.Game;

public static class DbSeeder
{
    public static void SeedGameNodes(this AppDbContext db)
    {
        if (db.GameNodes.Any()) return;

        db.GameNodes.AddRange(
            new GameNode
            {
                Url = "/",
                Description = "Welcome to Verbenium. Click Start for a demo.",
                Actions = new List<GameAction>
                {
                    new() { Label = "Start", Url = "start"}
                }
            },
            new GameNode
            {
                Url = "start",
                Chapter = 1,
                Description = "Okay, let's start: You wake up in a dark forest. What do you do?",
                ImageUrl = "forest-2.png",
                Actions = new List<GameAction>
                {
                    new() { Label = "Check surroundings", Url = "check_surroundings" }
                }
            },
            new GameNode
            {
                Url = "check_surroundings",
                Chapter = 1,
                Description = "You look around, and see a patch of mushrooms growing underneath a large tree. " +
                                            "You feel your stomach growl. The mushrooms look totally harmless.",
                ImageUrl = "forest-3.png",
                Actions = new List<GameAction>
                {
                    new() { Label = "Eat the mushrooms", Url = "eat_mushrooms" }
                }
            },
            new GameNode
            {
                Url = "eat_mushrooms",
                Chapter = 1,
                Description = "You were wrong about the mushrooms. GAME OVER.",
                ImageUrl = "death-mushroom.png",
                Actions = new List<GameAction>
                {
                    new() { Label = "Restart", Url = "start" }
                }
            },
            new GameNode
            {
                Url = "dont_eat_mushrooms",
                Chapter = 1,
                Description = "Taking your eyes away from the mushrooms, you see a clearing in the distance.",
                ImageUrl = "forest-1.png",
                Actions = new List<GameAction>()
            }
        );

        db.SaveChanges();
    }
}
