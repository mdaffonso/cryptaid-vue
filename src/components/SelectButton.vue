<template>
  <prompt-button :color="color" :class="{ unselected: !active }" @click="togglePlayer">
    {{color}}
  </prompt-button>
</template>

<script>
import { colors, gameSetup, clues } from "@/data"
import PromptButton from "@/components/PromptButton.vue"
export default {
  components: {
    PromptButton
  },

  data () {
    return {
      active: this.checked,
      clues
    }
  },

  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => colors.includes(value),
    },

    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    togglePlayer () {
      if (this.active) {
        gameSetup.otherPlayers = gameSetup.otherPlayers.filter(player => player.color !== this.color)
      } else {
        gameSetup.otherPlayers.push({
          color: this.color,
          clues: this.clues
        })
      }
      this.active = !this.active
    }
  }
}
</script>

<style>
.unselected {
  background: #dfdfdf !important;
  color: #444 !important;
} 
</style>