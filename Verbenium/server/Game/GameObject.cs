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
    public int? DefaultHeight { get; set; }
    public int? DefaultWidth { get; set; }
    public ObjectType Type { get; set; }
}
