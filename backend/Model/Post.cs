using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace tradeus.Model
{
    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        [ForeignKey(("User"))]
        public int CreatorId { get; set; }
        public virtual User Creator { get; set; }
        public DateTime Created { get; set; }
        public virtual ICollection<PostLike> PostLikes { get; set; }
        public virtual ICollection<PostComment> PostComments { get; set; }
    }
}