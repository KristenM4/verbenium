using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Verbenium.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddGameObjectPlacement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    DefaultHeight = table.Column<double>(type: "REAL", nullable: true),
                    DefaultWidth = table.Column<double>(type: "REAL", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameObjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GameObjectPlacements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GameNodeId = table.Column<int>(type: "INTEGER", nullable: false),
                    GameObjectId = table.Column<int>(type: "INTEGER", nullable: false),
                    PosX = table.Column<double>(type: "REAL", nullable: false),
                    PosY = table.Column<double>(type: "REAL", nullable: false),
                    Height = table.Column<double>(type: "REAL", nullable: true),
                    Width = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameObjectPlacements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameObjectPlacements_GameNodes_GameNodeId",
                        column: x => x.GameNodeId,
                        principalTable: "GameNodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameObjectPlacements_GameObjects_GameObjectId",
                        column: x => x.GameObjectId,
                        principalTable: "GameObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameObjectPlacements_GameNodeId",
                table: "GameObjectPlacements",
                column: "GameNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_GameObjectPlacements_GameObjectId",
                table: "GameObjectPlacements",
                column: "GameObjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameObjectPlacements");

            migrationBuilder.DropTable(
                name: "GameObjects");
        }
    }
}
