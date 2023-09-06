import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Import Bulma Sass
//import "bulma/bulma.sass";
import "./styles/main-lightmode.scss";
//import "./styles/main-darkmode.scss"; // not working

router.beforeEach((to, from, next) => {
  // Perform some action before the route is entered
  // For example, set the document title based on the route's meta title
  document.title = "Exercise App - " + to.meta.title;

  // Call next() to proceed to the route
  next();
});

createApp(App).use(store).use(router).mount("#app");
