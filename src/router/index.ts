import { createRouter, createWebHistory } from "vue-router";
import BookDetailsPage from "./BookDetailsPage.vue";
import BookListPage from "./BookListPage.vue";

const routes = [
  { path: "/", component: BookListPage },
  { path: "/book/:slug", component: BookDetailsPage },
  // Catch-all redirects to root
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
