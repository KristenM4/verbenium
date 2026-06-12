namespace Verbenium.server.Data;

using Verbenium.server.Game;

public static class DbSeeder
{
    public static void SeedGameNodes(this AppDbContext db)
    {
        ClearData(db);
        (GameObject player, GameObject mushroom) = AddGameObjects(db);
        AddGameNodesAndPlacements(db, player, mushroom);
    }

    private static void ClearData(AppDbContext db)
    {
        db.GameObjectPlacements.RemoveRange(db.GameObjectPlacements);
        db.GameActions.RemoveRange(db.GameActions);
        db.GameNodes.RemoveRange(db.GameNodes);
        db.GameObjects.RemoveRange(db.GameObjects);
        db.SaveChanges();
    }

    private static (GameObject Player, GameObject Mushroom) AddGameObjects(AppDbContext db)
    {
        var player = new GameObject
        {
            Name = "Player",
            ImageUrl = "player-sprite/sprite-basic.png",
            Type = ObjectType.Player,
            DefaultHeight = 16.67,
        };
        var mushroom = new GameObject
        {
            Name = "Mushroom",
            ImageUrl = "objects/mushrooms.png",
            Type = ObjectType.Item,
        };

        db.GameObjects.AddRange(player, mushroom);
        return (player, mushroom);
    }

    private static void AddGameNodesAndPlacements(AppDbContext db, GameObject player, GameObject mushroom)
    {
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
                ImageUrl = "level-1.jpg",
                UsesSprite = true,
                Actions = new List<GameAction>
                {
                    new() { Label = "Check surroundings", Url = "check_surroundings" }
                },
                Placements = new List<GameObjectPlacement>
                {
                    new() { Object = player, PosX = 41.67, PosY = 41.67 }
                }
            },
            new GameNode
            {
                Url = "check_surroundings",
                Chapter = 1,
                Description = "You look around, and see a patch of mushrooms growing underneath a large tree. " +
                                            "You feel your stomach growl. The mushrooms look totally harmless.",
                ImageUrl = "level-1.jpg",
                UsesSprite = true,
                Actions = new List<GameAction>
                {
                    new() { Label = "Eat the mushrooms", Url = "eat_mushrooms" }
                },
                Placements = new List<GameObjectPlacement>
                {
                    new() { Object = player, PosX = 41.67, PosY = 41.67 },
                    new() { Object = mushroom, PosX = 45, PosY = 72, Height = 14 }
                }
            },
            new GameNode
            {
                Url = "eat_mushrooms",
                Chapter = 1,
                Description = "You were wrong about the mushrooms. GAME OVER.",
                ImageUrl = "death-mushroom.png",
                UsesSprite = false,
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
                ImageUrl = "level-1.jpg",
                UsesSprite = true,
                Actions = new List<GameAction>(),
                Placements = new List<GameObjectPlacement>
                {
                    new() { Object = player, PosX = 41.67, PosY = 41.67 }
                }
            }
        );

        db.SaveChanges();
    }
}
