namespace Verbenium.server.Game;

public class GameObjectPlacement
{
    public int Id { get; set; }
    public int GameNodeId { get; set; }
    public GameNode Node { get; set; } = null!;
    public int GameObjectId { get; set; }
    public GameObject Object { get; set; } = null!;

    public double PosX { get; set; }
    public double PosY { get; set; }

    public double? Height { get; set; }
    public double? Width { get; set; }
}
