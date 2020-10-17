using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tradeus.Model;
using tradeus.Utility;
using tradeus.ViewModel;

namespace tradeus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseApiController
    {
        public UserController(TradeusDbContext context, IWebHostEnvironment env) : base(context, env)
        {
        }

        [Route("create")]
        [HttpPost]
        public IActionResult CreateAccount(CreateAccount createAccount)
        {
            if (_context.Users.Any(x => x.Username.ToUpper() == createAccount.Username.ToUpper()))
            {
                return BadRequest("This username is already taken.");
            }

            var token = Guid.NewGuid().ToString();
            var passwordHash = PasswordHasher.GenerateHashedPassword(createAccount.Password);
            var userEntity = _context.Users.Add(new User()
            {
                Created = DateTime.UtcNow,
                Token = token,
                Username = createAccount.Username,
                PasswordHash = passwordHash
            });
            _context.SaveChanges();
            var userDetails = new UserDetails()
            {
                Token = token,
                Username = createAccount.Username,
                UserId = userEntity.Entity.UserId
            };
            return Ok(userDetails);
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login(Login login)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == login.Username);
            if (user == null)
            {
                return BadRequest("Username/password incorrect");
            }

            var isPasswordCorrect = PasswordHasher.IsPasswordCorrect(login.Password, user.PasswordHash);
            if (isPasswordCorrect)
            {
                user.Token = Guid.NewGuid().ToString();
                var userDetails = new UserDetails()
                {
                    Token = user.Token,
                    Username = user.Username,
                    UserId = user.UserId
                };
                _context.SaveChanges();
                return Ok(userDetails);
            }

            return BadRequest("Username/password incorrect");
        }

        [Route("auth")]
        [HttpGet]
        public IActionResult Auth(string token)
        {
            var user = _context.Users.FirstOrDefault(x => x.Token == token);
            if (user == null)
            {
                return BadRequest("Token invalid");
            }

            var userDetail = new UserDetails()
            {
                Token = user.Token,
                Username = user.Username,
                UserId = user.UserId
            };
            return Ok(userDetail);
        }

        [Route("findusers")]
        [HttpGet]
        public ActionResult<IList<UserSearchItem>> SearchForUsers(string usernameQuery)
        {
            var currentUser = HandleTokenReturnUser();
            var users = _context.Users.Where(x => x.Username.ToUpper().Contains(usernameQuery.ToUpper()));
            return Ok(users.ToList().Select(x =>
            {
                var numberOfFollowers = _context.UserFollowings.Count(v => v.FollowingId == x.UserId);
                var isFollowing = x.UserId == currentUser.UserId ||
                                  _context.UserFollowings.Any(v =>
                                      v.FollowingId == x.UserId && v.UserId == currentUser.UserId);
                return new UserSearchItem()
                {
                    Username = x.Username,
                    UserId = x.UserId,
                    NumberOfFollowers = numberOfFollowers,
                    IsFollowing = isFollowing
                };
            }).ToList());
        }

        [Route("followuser")]
        [HttpPost]
        public IActionResult FollowUser(int userToFollowId)
        {
            var user = HandleTokenReturnUser();
            _context.UserFollowings.Add(new UserFollowing()
            {
                Created = DateTime.UtcNow,
                UserId = user.UserId,
                FollowingId = userToFollowId
            });
            _context.SaveChanges();
            return Ok();
        }

        [Route("unfollow")]
        [HttpPost]
        public IActionResult UnfollowUser(int userToUnfollowId)
        {
            var user = HandleTokenReturnUser();
            var userFollowings =
                _context.UserFollowings.Where(x => x.FollowingId == userToUnfollowId && x.UserId == user.UserId);
            _context.UserFollowings.RemoveRange(userFollowings);
            _context.SaveChanges();
            return Ok();
        }

        [Route("getprofileinfo/{username}")]
        [HttpGet]
        public ActionResult GetUserProfileInfo(string username)
        {
            var user = HandleTokenReturnUser();
            var userProfileInfo = new UserProfileInfo();
            var userEntity = _context.Users.First(x => x.Username == username);
            var userPosts = _context.Posts.Where(x => x.CreatorId == userEntity.UserId).ToList();
            userProfileInfo.Username = userEntity.Username;
            userProfileInfo.postDetailSimples = userPosts
                .Select(x => new PostDetailSimple()
                {
                    ImageBase64 = GetBase64ImageFromPath(x.FileName),
                    PostId = x.PostId,
                    NumberOfComments = _context.PostComments.Count(comment => comment.PostId == x.PostId),
                    NumberOfLikes = _context.PostLikes.Count(like => like.PostId == x.PostId)
                }).ToList();
            userProfileInfo.NumberOfPosts = userPosts.Count;
            userProfileInfo.NumberOfFollowers = _context.UserFollowings.Count(x => x.FollowingId == userEntity.UserId);
            userProfileInfo.NumberOfFollowing = _context.UserFollowings.Count(x => x.UserId == userEntity.UserId);
            userProfileInfo.IsFollowing = user.UserId == userEntity.UserId ||
                                          _context.UserFollowings.Any(x =>
                                              x.UserId == user.UserId && x.FollowingId == userEntity.UserId);
            userProfileInfo.UserId = userEntity.UserId;
            return Ok(userProfileInfo);
        }
    }
}