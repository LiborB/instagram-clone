using System;
using Microsoft.AspNetCore.Mvc;
using tradeus.Model;

namespace tradeus.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController : BaseApiController
    {
        public CommentController(TradeusDbContext context) : base(context)
        {
        }

        [Route("add")]
        [HttpPost]
        public IActionResult AddComment(AddComment addComment)
        {
            var user = HandleTokenReturnUser();

            _context.PostComments.Add(new PostComment()
            {
                Created = DateTime.UtcNow,
                CommentBody = addComment.CommentBody,
                PostId = addComment.PostId,
                UserId = user.UserId
            });
            _context.SaveChanges();
            return Ok();
        }
    }
}