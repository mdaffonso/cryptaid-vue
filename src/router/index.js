import { createRouter, createWebHistory } from "vue-router";
import { gameSetup } from "@/data";
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
    component: Game
  },
  {
    path: "/reset",
    name: "Reset",
    redirect: () => {
      const resetMatrix = {
        locale: gameSetup.locale,
        incompatibles: gameSetup.incompatibles,
        player: {
          color: null,
          clue: null,
        },
        otherPlayers: [],
        advancedMode: null,
        currentSetupPhase: "select-player-color",
        currentScreenIndex: 0,
        leftScreen: null,
        rightScreen: null,
        screenOrder: []
      }
      if (localStorage.getItem("currentGame")) {
        localStorage.removeItem("currentGame")
      }
      Object.keys(gameSetup).forEach(entry => {
        gameSetup[entry] = resetMatrix[entry]
      })
      return "/"
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
