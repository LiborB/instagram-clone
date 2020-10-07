using Microsoft.AspNetCore.Http;

namespace tradeus.ViewModel
{
    public class UploadPost
    {
        public IFormFile File { get; set; }
        public string Description { get; set; }
    }
}