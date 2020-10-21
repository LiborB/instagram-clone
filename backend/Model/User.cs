using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tradeus.Model
{
    public class User
    {
        public int UserId { get; set; }
        [MaxLength(20)]
        public string Username { get; set; }
        [StringLength(256)]
        public string PasswordHash { get; set; }
        public DateTime Created { get; set; }
        [StringLength(256)]
        public string Token { get; set; }
        public DateTime LastViewedNotification { get; set; }
        
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<PostComment> PostComments { get; set; }
        public virtual ICollection<PostLike> PostLikes { get; set; }
        public virtual ICollection<CommentLike> CommentLikes { get; set; }
        // public virtual ICollection<UserFollower> UserFollowers { get; set; }
        // public virtual ICollection<UserFollowing> UserFollowings { get; set; }
    }
}
