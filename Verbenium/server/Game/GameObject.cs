namespace Verbenium.server.Game;

public enum ObjectType
{
    Player,
    Item,
}

public class GameObject
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string ImageUrl { get; set; }
    public double? DefaultHeight { get; set; }
    public double? DefaultWidth { get; set; }
    public ObjectType Type { get; set; }

    public List<GameObjectPlacement> Placements { get; set; } = [];
}
