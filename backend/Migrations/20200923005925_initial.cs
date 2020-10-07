using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace youvue_api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(maxLength: 20, nullable: true),
                    PasswordHash = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    Token = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
