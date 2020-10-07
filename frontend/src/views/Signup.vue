<template>
  <div class="card">
    <div class="flex-item">
      <img
        width="200"
        class="login-logo"
        src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png-768x221.png"
      />
    </div>
    <div>
      <span class="form-field-error" v-if="signupError">{{ signupError }}</span>
    </div>
    <form @submit.prevent="signupClick">
      <div class="flex-item">
        <input
          v-model="username"
          class="form-input"
          placeholder="Username"
          maxlength="20"
        />
      </div>
      <div class="flex-item">
        <input
          type="password"
          v-model="password"
          class="form-input"
          placeholder="Password"
          maxlength="100"
        />
      </div>

      <div class="flex-item" style="width: 100%">
        <button
          type="submit"
          @keydown.enter="signupError"
          style="flex-grow: 1; margin-bottom: 10px"
        >
          Sign Up
        </button>
      </div>
      <div class="flex-item signup-text">
        <span
          >Already have an account?
          <router-link to="/login">Log In</router-link></span
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Globals } from "@/store";
import { UserDetails } from "@/models/UserDetails";
import { useRouter } from "vue-router";
import { useAxios } from "@/main";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    const signupError = ref("");
    const router = useRouter();

    const signupClick = () => {
      if (!/^\w+$/.test(username.value)) {
        signupError.value =
          "Username may only contain letters, numbers and underscores";
        return;
      }
      if (!username.value.length) {
        signupError.value = "Please enter a username";
        return;
      }
      if (!password.value.length) {
        signupError.value = "Please enter a password";
        return;
      }
      useAxios()
        .post<UserDetails>("user/create", {
          username: username.value,
          password: password.value
        })
        .then(response => {
          Globals.userDetails.value = response.data;
          localStorage.setItem("token", response.data.token);

          router.push("/");
        })
        .catch(error => {
          signupError.value = error.response?.data;
        });
    };
    return { username, password, signupError, signupClick };
  }
});
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: 1px solid #dbdbdb;
  padding: 20px 30px;
}

.login-logo {
  margin-bottom: 30px;
}

.signup-text {
  font-size: 14px;
  justify-content: center;
}
</style>
