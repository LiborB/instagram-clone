using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace tradeus.Model
{
    public class UserFollower
    {
        public int UserFollowerId { get; set; }
        public int UserId { get; set; }
        
        public int FollowerId { get; set; }
        public DateTime Created { get; set; }
        
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("FollowerId")]
        public virtual User Follower { get; set; }
    }
}