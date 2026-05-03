namespace Verbenium.server.Data;

public static class DbValidator
{
    public static void VerifyActionTargets(this AppDbContext db)
    {
        var nodeSlugs = db.GameNodes.Select(n => n.Url).ToHashSet();
        var orphans = db.GameActions
            .Where(a => !nodeSlugs.Contains(a.Url))
            .Select(a => new { a.Id, a.Label, Target = a.Url })
            .ToList();

        if (orphans.Count == 0) return;

        var details = string.Join(", ", orphans.Select(o => $"#{o.Id} '{o.Label}' → '{o.Target}'"));
        throw new InvalidOperationException(
            $"Found {orphans.Count} GameActions pointing to non-existent nodes: {details}");
    }
}
