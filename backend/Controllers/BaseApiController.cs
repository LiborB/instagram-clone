using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using tradeus.Model;

namespace tradeus.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected readonly TradeusDbContext _context;

        public BaseApiController(TradeusDbContext context)
        {
            _context = context;
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
    }
}