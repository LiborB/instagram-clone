using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using tradeus.Model;
using tradeus.ViewModel;

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
        
        [Route("getcomments/{postId}")]
        [HttpGet]

        public ActionResult<List<PostCommentDetail>> GetCommentPosts(int postId)
        {
            var user = HandleTokenReturnUser();

            var comments = _context.PostComments.Where(x => x.PostId == postId);
            return comments.Select(x => new PostCommentDetail()
            {
                Created = x.Created,
                Username = x.User.Username,
                CommentBody = x.CommentBody,
                NumberOfLikes = x.CommentLikes.Count(),
                IsLiked = x.CommentLikes.Any(x => x.UserId == user.UserId),
                PostCommentId = x.PostCommentId
            }).ToList();
        }
    }
}