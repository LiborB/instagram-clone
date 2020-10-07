using System;

namespace tradeus.Model
{
    public class CommentLike
    {
        public int CommentLikeId { get; set; }
        public int PostCommentId { get; set; }
        public virtual PostComment PostComment { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime Created { get; set; }
    }
}