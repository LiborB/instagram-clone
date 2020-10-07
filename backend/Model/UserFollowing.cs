using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace tradeus.Model
{
    public class UserFollowing
    {
        public int UserFollowingId { get; set; }
        public int UserId { get; set; }
        public int FollowingId { get; set; }
        public DateTime Created { get; set; }
        
        [ForeignKey("UserId")]

        public virtual User User { get; set; }
        [ForeignKey("FollowingId")]

        public virtual User Following { get; set; }
    }
}