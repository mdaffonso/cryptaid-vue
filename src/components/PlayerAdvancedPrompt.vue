<template>
  <div class="container root">
    <h2>{{ $t('setup.selectAdvancedMode') }}</h2>
    <p>{{ $t('setup.selectAdvancedModePTag') }}</p>
    <button @click="toggleAdvancedMode" class="advanced-button" :class="{ on: gameSetup.advancedMode }">{{ advancedModeButtonText }}</button>
    <next-button></next-button>
  </div>
</template>

<script>
import { gameSetup } from "@/data"
import NextButton from '@/components/NextButton.vue'

export default {
  components: { NextButton },
  data () {
    return {
      gameSetup
    }
  },
  computed: {
    advancedModeButtonText () {
      return gameSetup.advancedMode ? this.$t("setup.selectAdvancedModeEnabled") : this.$t("setup.selectAdvancedModeDisabled")
    }
  },

  methods: {
    toggleAdvancedMode () {
      gameSetup.advancedMode = !gameSetup.advancedMode
    }
  },

  mounted () {
    if (gameSetup.advancedMode === null) 
      gameSetup.advancedMode = false
  }
}
</script>

<style scoped>
p {
  text-align: center;
  max-width: 30ch;
}

.advanced-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10rem;
  background: #ddd;
  color: #444;
  margin: 4rem auto;
  text-transform: uppercase;
}

.on {
  background: rgb(93, 158, 8);
  color: white;
}
</style>