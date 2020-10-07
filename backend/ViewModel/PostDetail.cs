using System;

namespace tradeus.ViewModel
{
    public class PostDetail
    {
        public int PostId { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; }
        public int NumberOfLikes { get; set; }
        public DateTime Created { get; set; }
        public int NumberOfComments { get; set; }
        public string ImageBase64 { get; set; }
        public bool IsLiked { get; set; }
    }
}