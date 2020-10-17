namespace tradeus.Model
{
    public class PostDetailSimple
    {
        public int PostId { get; set; }
        public string ImageBase64 { get; set; }
        
        public int NumberOfComments { get; set; }
        public int NumberOfLikes { get; set; }
        
    }
}