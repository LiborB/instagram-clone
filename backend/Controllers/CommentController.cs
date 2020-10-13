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
                PostCommentId = x.PostCommentId,
                IsSelfComment = x.UserId == user.UserId
            }).OrderByDescending(x => x.Created).ToList();
        }

        [Route("like/{postCommentId}")]
        [HttpPost]
        public IActionResult Like(int postCommentId)
        {
            var user = HandleTokenReturnUser();

            if (!_context.CommentLikes.Any(x => x.PostCommentId == postCommentId && x.UserId == user.UserId))
            {
                _context.CommentLikes.Add(new CommentLike()
                {
                    Created = DateTime.UtcNow,
                    UserId = user.UserId,
                    PostCommentId = postCommentId
                });
                _context.SaveChanges();
            }

            return Ok();
        }

        [Route("unlike/{postCommentId}")]
        [HttpPost]
        public IActionResult Unlike(int postCommentId)
        {
            var user = HandleTokenReturnUser();

            var commentLikes =
                _context.CommentLikes.Where(x => x.PostCommentId == postCommentId && x.UserId == user.UserId);
            _context.RemoveRange(commentLikes);

            _context.SaveChanges();
            return Ok();
        }
    }
}