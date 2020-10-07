import { UserDetails } from "@/models/UserDetails";
import { computed, ref } from "vue";
import { createStore } from "vuex";
import PostDetail from "@/models/PostDetail";

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

export class Globals {
  static isLoggedIn = computed(
    () => Globals.userDetails.value.token.length > 0
  );
  static userDetails = ref(new UserDetails());
  static loginLoaded = false;
  static postDetailList = ref([] as PostDetail[])
}
