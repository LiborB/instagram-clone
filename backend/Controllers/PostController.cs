using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tradeus.Model;
using tradeus.ViewModel;

namespace tradeus.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : BaseApiController
    {
        private IWebHostEnvironment _hostingEnvironment;

        public PostController(TradeusDbContext context, IWebHostEnvironment env) : base(context, env)
        {
            _hostingEnvironment = env;
        }

        [Route("upload")]
        [HttpPost]
        public ActionResult<PostDetail> UploadPost([FromForm] UploadPost uploadPost)
        {
            var user = HandleTokenReturnUser();
            var dataFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Data");
            var fileExtension = Path.GetExtension(uploadPost.File.FileName);
            var filename = DateTime.UtcNow.Ticks + fileExtension;
            var filePath = Path.Combine(dataFolder, filename);
            var post = new Post()
            {
                Created = DateTime.UtcNow,
                CreatorId = user.UserId,
                Description = uploadPost.Description,
                FileName = filename
            };
            _context.Posts.Add(post);
            _context.SaveChanges();
            string base64Image;
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                uploadPost.File.CopyTo(fileStream);
            }

            base64Image = "data:image/" + fileExtension.Replace(".","")
                                        + ";base64," 
                                        + Convert.ToBase64String(System.IO.File.ReadAllBytes(filePath));

            var postDetail = new PostDetail()
            {
                Created = post.Created,
                Description = post.Description,
                CreatorId = post.CreatorId,
                CreatorName = post.Creator.Username,
                PostId = post.PostId,
                NumberOfComments = 0,
                NumberOfLikes = 0,
                ImageBase64 = base64Image
            };
            return Ok(postDetail);
        }

        [Route("postlist")]
        [HttpGet]
        public ActionResult<List<PostDetail>> GetPostDetailList(int skip, int take)
        {
            var user = HandleTokenReturnUser();
            var userFollowingIds =
                _context.UserFollowings.Where(x => x.UserId == user.UserId).Select(x => x.FollowingId);
            var posts = _context.Posts.Where(x => x.CreatorId == user.UserId ||  userFollowingIds.Contains(x.CreatorId)).Include(x => x.Creator).Skip(skip).Take(take);
            var dataFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Data");
            var postDetailsList = posts.ToList().Select(x =>
            {
                var file = System.IO.File.ReadAllBytes(Path.Combine(dataFolder, x.FileName));
                return new PostDetail()
                {
                    Created = x.Created,
                    Description = x.Description,
                    CreatorId = x.CreatorId,
                    CreatorName = x.Creator.Username,
                    PostId = x.PostId,
                    NumberOfComments = _context.PostComments.Count(comment => comment.PostId == x.PostId),
                    NumberOfLikes = _context.PostLikes.Count(like => like.PostId == x.PostId),
                    ImageBase64 = GetBase64ImageFromPath(x.FileName),
                    IsLiked = _context.PostLikes.Any(like => like.PostId == x.PostId && like.UserId == user.UserId)
                };
            });
            return Ok(postDetailsList);
        }

        [Route("getpostdetail/{postId}")]
        [HttpGet]
        public ActionResult<PostDetail> GetPostDetail(int postId)
        {
            var user = HandleTokenReturnUser();
            var post = _context.Posts.First(x => x.PostId == postId);
            var dataFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Data");
            var file = System.IO.File.ReadAllBytes(Path.Combine(dataFolder, post.FileName));
            var postDetail = new PostDetail()
            {
                Created = post.Created,
                Description = post.Description,
                CreatorId = post.CreatorId,
                CreatorName = post.Creator.Username,
                PostId = post.PostId,
                NumberOfComments = _context.PostComments.Count(comment => comment.PostId == post.PostId),
                NumberOfLikes = _context.PostLikes.Count(like => like.PostId == post.PostId),
                ImageBase64 = "data:image/" + Path.GetExtension(Path.Combine(dataFolder, post.FileName)).Replace(".","")
                                            + ";base64," + Convert.ToBase64String(file),
                IsLiked = _context.PostLikes.Any(like => like.PostId == post.PostId && like.UserId == user.UserId)
            };
            return Ok(postDetail);
        }

        [Route("like/{postId}")]
        [HttpPost]
        public IActionResult LikePost(int postId)
        {
            var user = HandleTokenReturnUser();
            if (!_context.PostLikes.Any(x => x.UserId == user.UserId && x.PostId == postId))
            {
                _context.PostLikes.Add(new PostLike()
                {
                    Created = DateTime.UtcNow,
                    PostId = postId,
                    UserId = user.UserId
                });
                _context.SaveChanges();
            }

            return Ok();
        }
        
        [Route("unlike/{postId}")]
        [HttpPost]
        public IActionResult UnlikePost(int postId)
        {
            var user = HandleTokenReturnUser();
            var postLike = _context.PostLikes.Where(x => x.UserId == user.UserId && x.PostId == postId);
            _context.PostLikes.RemoveRange(postLike);

            _context.SaveChanges();
            return Ok();
        }
    }
}