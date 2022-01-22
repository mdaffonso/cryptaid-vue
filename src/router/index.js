import { createRouter, createWebHistory } from "vue-router";
import Setup from "@/views/Setup.vue";
import Game from "@/views/Game.vue"

const routes = [
  {
    path: "/",
    name: "Setup",
    component: Setup,
  },
  {
    path: "/play",
    name: "Game",
    component: Game,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
