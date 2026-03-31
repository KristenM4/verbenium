namespace Verbenium.server.Game;

public class GameAction
{
    public int Id { get; set; }
    public required string Label { get; set; }
    public required string Url { get; set; }
    public int GameNodeId { get; set; }
}
