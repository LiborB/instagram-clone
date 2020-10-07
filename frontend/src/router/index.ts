import { Globals } from "@/store";
import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Direct from "../views/Direct.vue";
import Profile from "@/views/Profile.vue";

function requiresAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  console.log(Globals.loginLoaded);

  if (Globals.loginLoaded && !Globals.isLoggedIn.value) {
    next({ name: "Login" });
  } else {
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requiresAuth
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/direct",
    name: "Direct",
    component: Direct,
    beforeEnter: requiresAuth
  },
  {
    path: "/user/:username",
    name: "Profile",
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
