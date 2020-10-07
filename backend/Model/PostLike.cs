using System;

namespace tradeus.Model
{
    public class PostLike
    {
        public int PostLikeId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public DateTime Created { get; set; }
    }
}