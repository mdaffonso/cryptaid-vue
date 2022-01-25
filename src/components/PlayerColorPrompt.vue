<template>
  <div class="root container">
    <h2>{{$t('setup.selectColorPrompt')}}</h2>
    <div class="buttons">
      <prompt-button
        v-for="color in colors"
        :key="color"
        :color="color"
        @click="selectColor(color)"
        >{{ $t(`colors.${color}`) }}</prompt-button>
    </div>
    <p>v. 1.1</p>
  </div>
</template>

<script>
import { colors, gameSetup, toast } from "@/data";
import PromptButton from "@/components/PromptButton.vue";
import { useSetupRedirect } from '@/composables';
export default {
  components: {
    PromptButton,
  },
  data() {
    return {
      colors,
    };
  },
  methods: {
    selectColor(color) {
      gameSetup.player.color = color
      if (gameSetup.otherPlayers.find(p => p.color === color) && gameSetup.otherPlayers.length < 3) {
        toast.notify(this.$t('warnings.notEnoughPlayers'))
      }
      gameSetup.otherPlayers = gameSetup.otherPlayers.filter(p => p.color !== color)

      useSetupRedirect()
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  flex-flow: row wrap;
  max-width: 30ch;
  justify-content: center;
  align-items: stretch;
}

p {
  opacity: 0.5;
  font-size: 0.75rem;
  margin: auto 0 0;
}
</style>
