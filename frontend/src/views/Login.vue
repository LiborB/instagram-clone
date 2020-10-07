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
      <span class="form-field-error" v-if="loginError">{{ loginError }}</span>
    </div>
    <form @submit.prevent="loginClick">
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
          @keydown.enter="loginError"
          style="flex-grow: 1; margin-bottom: 10px"
        >
          Log In
        </button>
      </div>
      <div class="flex-item signup-text">
        <span
          >Don't have an account?
          <router-link to="/signup">Sign Up</router-link></span
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
    const loginError = ref("");
    const router = useRouter();

    const loginClick = () => {
      useAxios()
        .post<UserDetails>("user/login", {
          username: username.value,

          password: password.value
        })
        .then(response => {
          Globals.userDetails.value = response.data;
          localStorage.setItem("token", response.data.token);

          router.push("/");
        })
        .catch(error => {
          loginError.value = error.response?.data;
        });
    };
    return { username, password, loginError, loginClick };
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
