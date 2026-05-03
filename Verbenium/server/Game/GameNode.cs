namespace Verbenium.server.Game;

public class GameNode
{
    public int Id { get; set; }
    public string Url { get; set; } = "";
    public int? Chapter { get; set; }
    public string Description { get; set; } = "";
    public string? ImageUrl { get; set; }
    public List<GameAction> Actions { get; set; } = [];
}
