import PostDetailSimple from "./PostDetailSimple";

export default class UserProfileInfo {
    userId = 0;
    numberOfPosts = 0;
    numberOfFollowers = 0;
    numberOfFollowing = 0;
    username = "";
    postDetailSimples = [] as PostDetailSimple[];
    isFollowing = false;
}
