import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
import "vue2-datepicker/index.css";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import "./libs";
// SASS Theme
import "./assets/scss/app.scss";
import rules from "./validate/validate.js";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import "vue2-datepicker/index.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue2-datepicker/index.css";
import { extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import VueMasonry from "vue-masonry-css";
import VueApexCharts from "vue-apexcharts";
import Avatar from "vue-avatar";
import Loading from "./components/Loading/Loading.vue";
import VTooltip from "v-tooltip";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
extend("required", {
  ...required,
  message: "Please enter first name",
});

Vue.config.productionTip = false;
rules();

Vue.use(VueMasonry);
Vue.component("v-select", vSelect);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ApexCharts", VueApexCharts);
Vue.component("Avatar", Avatar);
Vue.component("Loading", Loading);
Vue.component("tree-select", Treeselect);

Vue.use(PerfectScrollbar);
Vue.use(VueApexCharts);
Vue.use(Notifications);
Vue.use(VTooltip);

// VeeValidate.Validator.extend("Spassword", {
//   getMessage: (field) =>
//     `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
//   validate: (value) => {
//     var strongRegex = new RegExp(
//       "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
//     );
//     return strongRegex.test(value);
//   },
// });
router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
