<template>
  <div class="nav">
    <div class="flex-item nav-container">
      <div class="flex-item">
        <router-link to="/"
          ><img
            width="100"
            class="login-logo"
            src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png-768x221.png"
          />
        </router-link>
      </div>
      <div class="flex-item search-container">
        <div
          class="search-input-container"
          style="display: flex; flex-grow: 1"
          v-click-outside="() => (showSearchResults = false)"
        >
          <input
            @focus="showSearchResults = true"
            class="input"
            placeholder="Search"
            @input="searchForUsers($event)"
          />
          <img
            v-if="isSearching"
            width="20"
            style="position: absolute; right: 5px; top: 7px"
            src="@/assets/tail-spin.svg"
            alt="Loading icon"
          />
          <ul v-if="searchInputUsers.length > 0 && showSearchResults">
            <li
              v-for="(user, index) in searchInputUsers"
              :key="index"
              style="display: flex; justify-content: space-between"
            >
              <div
                class="user-search-name"
                @click="$router.push(`/user/${user.username}`)"
              >
                <span class="bold">{{ user.username }}</span>
                <span>&nbsp;</span>
                <span style="font-size: 12px">{{
                  getFollowerCount(user.numberOfFollowers)
                }}</span>
              </div>
              <div>
                <i
                  @click="followUser(user)"
                  v-if="!user.isFollowing"
                  class="fal fa-user-plus follow-user-icon"
                ></i>
              </div>
            </li>
          </ul>
        </div>
        <button
          v-if="isLoggedIn"
          title="Add a post"
          class="add-post-btn"
          @click="uploadModalOpen = true"
        >
          <i class="far fa-plus-circle"></i>Add Post
        </button>
      </div>
      <div class="flex-item">
        <i
          title="Home"
          class="fa-home nav-icon"
          :class="{
            fas: currentLinkActive === 'Home',
            'far nav-icon-inactive': currentLinkActive !== 'Home'
          }"
          @click="setCurrentLink('Home')"
        ></i>
        <i
          title="Direct Messages"
          class="fa-paper-plane nav-icon"
          :class="{
            fas: currentLinkActive === 'Direct',
            'far nav-icon-inactive': currentLinkActive !== 'Direct'
          }"
          @click="setCurrentLink('Direct')"
        ></i>
        <i
          title="Your Activity"
          class="fa-heart nav-icon"
          :class="{
            fas: currentLinkActive === 'Activity',
            'far nav-icon-inactive': currentLinkActive !== 'Activity'
          }"
          @click="activityClick"
        ></i>

        <l-menu>
          <template v-slot:trigger>
            <i
              class="fa-user-circle nav-icon"
              :class="{
                fas: currentLinkActive === 'Profile',
                'far nav-icon-inactive': currentLinkActive !== 'Profile'
              }"
              @click="profileClick"
            ></i>
          </template>
          <template v-slot:item>
            <li>Profile</li>
            <li>Account</li>
            <li v-if="isLoggedIn" class="logout" @click="logoutClick">
              Logout
            </li>
            <li v-if="!isLoggedIn">
              <router-link
                style="text-decoration: none; color: black"
                to="/login"
                >Login</router-link
              >
            </li>
          </template>
        </l-menu>
      </div>
    </div>
  </div>
  <upload-post-modal
    @close="uploadModalOpen = false"
    :open="uploadModalOpen"
  ></upload-post-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import UploadPostModal from "@/components/UploadPostModal.vue";
import LMenu from "@/components/Menu.vue";
import { Globals } from "@/store/index";
import { UserDetails } from "@/models/UserDetails";
import { useAxios } from "@/main";
import UserSearchItem from "@/models/UserSearchItem";
import { AxiosResponse } from "axios";
import { makeFriendly } from "@/utility/NumberUtil";

export default defineComponent({
  components: { UploadPostModal, LMenu },
  setup() {
    const currentLinkActive = ref("Home");
    const router = useRouter();
    const uploadModalOpen = ref(false);
    const searchInputUsers = ref([] as UserSearchItem[]);
    const isSearching = ref(false);
    const showSearchResults = ref(false);

    const getFollowerCount = (followers: number) => {
      makeFriendly(followers);
    };
    const followUser = (user: UserSearchItem) => {
      useAxios()
        .post(
          "user/followuser",
          {},
          {
            params: {
              userToFollowId: user.userId
            }
          }
        )
        .then(response => {
          user.isFollowing = true;
        });
    };

    const setCurrentLink = (name: string) => {
      if (Globals.isLoggedIn.value) {
        currentLinkActive.value = name;

        router.push({
          name: name
        });
      }
    };

    const activityClick = () => {
      currentLinkActive.value = "Activity";
    };
    const profileClick = () => {
      currentLinkActive.value = "Profile";
    };

    const logoutClick = () => {
      localStorage.removeItem("token");
      router.push("/login");
      Globals.userDetails.value = new UserDetails();
    };

    const searchForUsers = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const value = input.value;
      if (!value) {
        searchInputUsers.value = [];
        return;
      }
      isSearching.value = true;
      useAxios()
        .get<{}, AxiosResponse<UserSearchItem[]>>("user/findusers", {
          params: {
            usernameQuery: value
          }
        })
        .then(response => {
          searchInputUsers.value = response.data;
          isSearching.value = false;
        })
        .catch(error => {
          isSearching.value = false;
        });
    };

    return {
      currentLinkActive,
      setCurrentLink,
      activityClick,
      profileClick,
      uploadModalOpen,
      logoutClick,
      isLoggedIn: Globals.isLoggedIn,
      searchInputUsers,
      searchForUsers,
      showSearchResults,
      isSearching,
      followUser,
      getFollowerCount
    };
  }
});
</script>

<style lang="scss" scoped>
.nav {
  top: 0;
  position: fixed;
  width: 100%;
  height: 50px;
  background: white;
}

.nav-container {
  justify-content: space-between;
  padding-top: 10px;
  width: 40%;
  margin: 0 auto;
}

.add-post-btn {
  font-size: 16px;
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 0 20px;

  &:hover {
    background-color: #f7f7f7;
  }
  i {
    padding-right: 5px;
  }
}

.menu {
  position: relative;
}

.menu ul {
  background-color: white;
  position: absolute;
  display: flex;
  visibility: hidden;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  list-style: none;
  width: 150px;
  height: 120px;
  border-radius: 5px;
  box-shadow: 0 0 10px #dbdbdb;
  cursor: pointer;
  padding: 0;
}

.menu ul li {
  font-size: 14px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.menu ul li:hover {
  background-color: #f1f1f1;
}
.menu ul li:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.menu ul li:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.menu .open {
  visibility: visible;
}

.logout {
  border-top: 1px solid whitesmoke;
  color: #ff2d2d;
}

.search-container {
  flex-basis: 45%;
}

.search-input-container {
  position: relative;
  display: flex;
  flex-grow: 1;
  input {
    flex-grow: 1;
  }
  ul {
    background-color: white;
    position: absolute;
    padding: 0;
    left: 0;
    right: 0;
    top: 30px;
    list-style: none;
    border: 1px solid #dbdbdb;
    box-shadow: 0 0 1px #dbdbdb;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 45%;
      width: 0;
      height: 0;
      border-style: solid;
    }
    &:before {
      top: -21px;
      border-color: transparent transparent #dbdbdb transparent;
      border-width: 10px;
    }
    &:after {
      margin-left: -1px;
      top: -20px;
      border-color: transparent transparent white transparent;
      border-width: 11px;
    }
    li {
      padding: 10px;
    }
  }
}

.follow-user-icon {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}

.user-search-name {
  cursor: pointer;
}
</style>
