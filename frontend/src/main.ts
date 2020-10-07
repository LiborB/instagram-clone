import {createApp, VNode} from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faLocationArrow);
axios.defaults.baseURL = "https://localhost:44317/api/";


export const useAxios = () => {
    return axios.create({
        baseURL: 'https://localhost:44317/api/',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

const app = createApp(App);
app.directive("click-outside", {
    beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = (event: Event) => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value

                if (typeof binding.value === "function") {
                    binding.value();
                } else {
                    console.warn("v-click-outside requires a function as a parameter");
                }
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    }
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).mount("#app");
