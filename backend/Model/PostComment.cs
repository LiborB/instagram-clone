using System;
using System.Collections.Generic;

namespace tradeus.Model
{
    public class PostComment
    {
        public int PostCommentId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public string CommentBody { get; set; }
        public DateTime Created { get; set; }
        public virtual ICollection<CommentLike> CommentLikes { get; set; }
    }
}