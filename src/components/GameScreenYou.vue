<template>
  <div class="root container screen" :class="color">
    <h3 class="game-screen-title">{{ $t('game.yourClue') }}</h3>
    <p>{{ $t(`clues.clues.${gameSetup.player.clue.value}`) }}</p>
  </div>
</template>

<script>
import { colors, gameSetup } from '@/data'
export default {
  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => colors.includes(value)
    },
  },

  data () {
    return {
      gameSetup
    }
  }
}
</script>

<style scoped>
p {
  font-size: 3rem;
  font-weight: 300;
  margin: 2rem 0;
  text-align: center;
}

.game-screen-title {
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 1.75rem;
}

.screen {
  width: 100%;
  color: white;
}

</style>