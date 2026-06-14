using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Verbenium.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUsesSprite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsesSprite",
                table: "GameNodes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "UsesSprite",
                table: "GameNodes",
                type: "INTEGER",
                nullable: true);
        }
    }
}
