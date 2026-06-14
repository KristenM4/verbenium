namespace Verbenium.server.Game;

using System.Text.Json.Serialization;

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

    [JsonIgnore]
    public List<GameObjectPlacement> Placements { get; set; } = [];
}
