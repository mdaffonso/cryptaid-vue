<template>
  <transition name="fade">
    <component :is="currentComponent"></component>
  </transition>
  <teleport to="#notifications" v-if="toast.notificationMessage">
    <toast-notification>{{ toast.notificationMessage }}</toast-notification>
  </teleport>
</template>

<script>
import { gameSetup, toast } from "@/data";
import PlayerColorPrompt from "@/components/PlayerColorPrompt.vue";
import PlayerCluePrompt from "@/components/PlayerCluePrompt.vue";
import PlayerAdversariesPrompt from "@/components/PlayerAdversariesPrompt.vue";
import PlayerAdvancedPrompt from "@/components/PlayerAdvancedPrompt.vue";
import SetupSummary from "@/components/SetupSummary.vue";
import ToastNotification from '@/components/ToastNotification.vue';
export default {
  data () {
    return {
      toast
    }
  },

  components: {
    PlayerColorPrompt,
    PlayerCluePrompt,
    PlayerAdversariesPrompt,
    PlayerAdvancedPrompt,
    SetupSummary,
    ToastNotification
  },

  computed: {
    currentComponent () {
      switch (gameSetup.currentSetupPhase) {
        case "select-player-color":
          return "player-color-prompt"
        case "select-player-clue":
          return "player-clue-prompt"
        case "select-adversaries":
          return "player-adversaries-prompt"
        case "select-advanced-mode":
          return "player-advanced-prompt"
        default:
          return "setup-summary"
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
