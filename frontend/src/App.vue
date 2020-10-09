<template>
  <top-nav></top-nav>
  <div class="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Globals } from "./store";
import Axios from "axios";
import { UserDetails } from "./models/UserDetails";
import { useRouter } from "vue-router";
import TopNav from "@/components/TopNav.vue";
import ModalContainer from "@/components/ModalContainer.vue";

export default defineComponent({
  components: {
    TopNav
  },
  setup() {
    onMounted(() => {
      const token = localStorage.getItem("token");
      const router = useRouter();
      if (token) {
        Axios.get<UserDetails>("user/auth", {
          params: {
            token: token
          }
        })
          .then(response => {
            Globals.userDetails.value = response.data;
            Globals.loginLoaded = true;
          })
          .catch(error => {
            router.push("/login");
            Globals.loginLoaded = true;
          });
      } else {
        router.push("/login");
        Globals.loginLoaded = true;
      }
    });
    return { userDetails: Globals.userDetails };
  }
});
</script>

<style lang="scss">
@import "./fontawesome/css/all.min.css";
#app {
  font-family: "Open Sans", sans-serif;
}

body {
  background-color: #fafafa;
  margin: 0;
}

.content {
  padding-top: 60px;
  display: flex;
  justify-content: center;
}

.form-input {
  font-size: 18px;
  padding: 5px;
  margin-bottom: 10px;
  width: 300px;
}

.flex-item {
  display: flex;
}

.form-field-error {
  color: red;
  font-size: 14px;
}

.nav-icon {
  padding: 0 10px;
  font-size: 25px;
  cursor: pointer;
}

.nav-icon-inactive {
  opacity: 0.4;
}

.bold {
  font-weight: 600;
}

textarea,
input {
  font-family: inherit;
  font-size: inherit;
}

.input {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #dbdbdb;
  &:focus {
    outline: 1px solid #97bcff;
  }
}
</style>
