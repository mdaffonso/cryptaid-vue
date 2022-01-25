<template>
  <div class="root container">
    <h2>{{ $t('setup.selectOpponents') }}</h2>
    <div class="adversary-buttons">
      <select-button v-for="color in filteredColors" :key="color" :color="color" :checked="autoCheck(color)"></select-button>
    </div>
    <next-button :condition="minimumPlayers" :error="$t('warnings.notEnoughPlayers')"></next-button>
  </div>
</template>

<script>
import { colors, gameSetup } from "@/data"
import SelectButton from '@/components/SelectButton.vue'
import NextButton from '@/components/NextButton.vue'
export default {
  components: {
    SelectButton,
    NextButton
  },

  data() {
    return {
      colors
    }
  },
  
  computed: {
    filteredColors() {
      return colors.filter(color => color !== gameSetup.player.color)
    },

    minimumPlayers () {
      return gameSetup.otherPlayers.length >= 2
    }
  },

  methods: {
    autoCheck (color) {
      const player = gameSetup.otherPlayers.find(p => p.color === color)
      if (player)
        return true
      return false
    }
  }
}
</script>

<style scoped>
h2 {
  max-width: 30ch;
}

.adversary-buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 30ch;
}
</style>