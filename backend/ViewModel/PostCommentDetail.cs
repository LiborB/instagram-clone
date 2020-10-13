using System;

namespace tradeus.ViewModel
{
    public class PostCommentDetail
    {
        public int PostCommentId { get; set; }
        public string Username { get; set; }
        public string CommentBody { get; set; }
        public DateTime Created { get; set; }
        public int NumberOfLikes { get; set; }
        public bool IsLiked { get; set; }
        public bool IsSelfComment { get; set; }
    }
}