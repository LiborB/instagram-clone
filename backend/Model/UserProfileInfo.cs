using System.Collections.Generic;

namespace tradeus.Model
{
    public class UserProfileInfo
    {
        public string Username { get; set; }
        public int NumberOfPosts { get; set; }
        public int NumberOfFollowers { get; set; }
        public int NumberOfFollowing { get; set; }
        public List<PostDetailSimple> postDetailSimples { get; set; }
    }
}