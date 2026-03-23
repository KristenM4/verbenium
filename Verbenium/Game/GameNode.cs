namespace Verbenium.Game;

public class GameNode
{
    public string Description { get; set; } = "";
    public string? ImageUrl { get; set; }
    public List<GameAction>? Actions { get; set; }
}
