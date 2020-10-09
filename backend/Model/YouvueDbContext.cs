using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tradeus.Model
{
    public class TradeusDbContext : DbContext
    {
        public TradeusDbContext(DbContextOptions<TradeusDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-662BOTM\SQLEXPRESS;Database=instaclone;Trusted_Connection=True;MultipleActiveResultSets=true");
            // optionsBuilder.UseSqlServer(@"Server=DESKTOP-E1IM2SR;Database=instaclone;Trusted_Connection=True;MultipleActiveResultSets=true");

        }
    }
}
