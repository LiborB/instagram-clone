<template>
  <div class="home">
    <div class="card" v-for="post in postDetailList" :key="post.postId">
      <div class="card-title">
        <router-link to="" class="bold">{{ post.creatorName }}</router-link>
        <div><i class="fas fa-ellipsis-h"></i></div>
      </div>
      <div>
        <img style="width: 100%" :src="post.imageBase64" alt="Post image" />
      </div>
      <div class="card-bottom">
        <div class="card-icons">
          <i
            v-if="post.isLiked"
            class="fas fa-heart liked"
            @click="unlikePost(post)"
          ></i>
          <i v-else class="far fa-heart" @click="likePost(post)"></i>
          <i class="far fa-comment-dots"></i>
          <i class="far fa-paper-plane"></i>
        </div>
        <div class="likes-container" v-if="post.numberOfLikes > 0">
          <span class="bold likes-text"
            >{{ post.numberOfLikes }}
            {{ post.numberOfLikes > 1 ? "likes" : "like" }}</span
          >
        </div>
        <div v-if="post.description">
          <span class="bold">{{ post.creatorName }}&nbsp;</span>
          <span>{{ post.description }}</span>
        </div>
        <div class="view-comments" v-if="post.numberOfComments > 0">
          <span>View all {{ post.numberOfComments }} comments</span>
        </div>
        <div class="date-created">
          <span>{{ timeAgo(post.created) }}</span>
        </div>
        <div class="separator"></div>
        <div class="add-comment">
          <textarea
            class="input"
            v-model="post.currentCommentValue"
            placeholder="Add a comment..."
          />
          <button
            @click="addComment(post)"
            :class="{ disabled: !post.currentCommentValue }"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import Axios, { AxiosResponse } from "axios";
import PostDetail from "@/models/PostDetail";
import { Globals } from "@/store";
import { useAxios } from "@/main";
import moment from "moment";

export default defineComponent({
  name: "Home",
  setup() {
    onBeforeMount(() => {
      useAxios()
        .get<{}, AxiosResponse<PostDetail[]>>("posts/postlist", {
          params: {
            skip: 0,
            take: 100
          }
        })
        .then(response => {
          Globals.postDetailList.value = response.data;
        });
    });

    const addComment = (post: PostDetail) => {
      useAxios()
        .post("comments/add", {
          postId: post.postId,
          commentBody: post.currentCommentValue
        })
        .then(response => {
          post.currentCommentValue = "";
          post.numberOfComments++;
        });
    };

    const likePost = (post: PostDetail) => {
      useAxios()
        .post(`posts/like/${post.postId}`)
        .then(response => {
          post.isLiked = true;
          post.numberOfLikes++;
        });
    };

    const unlikePost = (post: PostDetail) => {
      useAxios()
        .post(`posts/unlike/${post.postId}`)
        .then(response => {
          post.isLiked = false;
          post.numberOfLikes--;
        });
    };

    const timeAgo = (date: Date) => moment.utc(date).fromNow();

    return {
      postDetailList: Globals.postDetailList,
      timeAgo,
      addComment,
      likePost,
      unlikePost
    };
  }
});
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  padding: 10px 0;
  margin: 20px 0;
  outline: 1px solid #dbdbdb;
  font-size: 14px;
}
.home {
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
}

.card-title {
  padding: 0 10px 10px;
  display: flex;
  justify-content: space-between;
}

.card-bottom {
  padding: 5px 10px 5px 10px;
}

.card-icons {
  margin-bottom: 5px;
  i {
    font-size: 24px;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
    &.liked {
      color: red;
    }
  }
}

.likes-text {
  font-size: 12px;
}

.likes-container {
  margin-bottom: 10px;
}

.view-comments {
  color: rgb(142, 142, 142);
}

.date-created {
  color: rgb(142, 142, 142);
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
}
.separator {
  border-bottom: 1px solid rgb(239, 239, 239);
  margin: 0 -10px;
}

.add-comment {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0 0;
  button {
    background-color: white;
    box-shadow: 0 0 2px cornflowerblue;
    width: 90px;
    height: 43px;
    color: cornflowerblue;
    outline: none;
    cursor: pointer;
    border: 1px solid cornflowerblue;
    margin-left: 10px;
    &.disabled {
      pointer-events: none;
      cursor: default !important;
      border: none;
      opacity: 0.8;
    }
  }
  textarea {
    flex-grow: 1;
    resize: none;
  }
}
</style>
