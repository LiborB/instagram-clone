using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using tradeus.Model;

namespace tradeus.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected readonly TradeusDbContext _context;
        protected readonly IWebHostEnvironment _hostingEnvironment;


        public BaseApiController(TradeusDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostEnvironment;
        }
        protected void HandleToken()
        {
            var token = HttpContext.Request.Headers["token"];
            if (String.IsNullOrEmpty(token))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            if (!_context.Users.Any(x => x.Token == token.ToString()))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
        }
        
        protected User HandleTokenReturnUser()
        {
            var token = HttpContext.Request.Headers["token"];
            if (String.IsNullOrEmpty(token))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var user = _context.Users.FirstOrDefault(x => x.Token == token.ToString());
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            return user;
        }

        protected string GetBase64ImageFromPath(string fileName)
        {
            var dataFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Data");
            var file = System.IO.File.ReadAllBytes(Path.Combine(dataFolder, fileName));
            var imageBase64 = "data:image/" + Path.GetExtension(Path.Combine(dataFolder, fileName)).Replace(".", "")
                                            + ";base64," + Convert.ToBase64String(file);
            return imageBase64;
        }
    }
}