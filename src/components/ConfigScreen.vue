<template>
  <div class="root container black">
    <button @click="resetGame" class="reset">{{ $t('game.playAgain') }}</button>
    <button @click="showEnd" class="show-end" :class="{ disabled: !allowButton }">{{ $t('game.showFinalClues') }}</button>
  </div>
</template>

<script>
import { toast } from '@/data'
export default {
  props: {
    allowButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    resetGame () {
      this.$emit('resetEvent')
    },

    showEnd () {
      if (!this.allowButton) {
        toast.notify(this.$t('warnings.showFinalClues'))
        return
      }

      this.$emit("showEndEvent")
    }
  }
}
</script>

<style>
.black {
  background: rgb(20, 20, 20);
  z-index: 500;
}

.reset {
  background: crimson;
  color: white;
  padding: 1rem 2rem;
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 3rem 1rem 2rem;
}

.show-end {
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 10rem;
  font-size: 0.9rem;
  text-transform: lowercase;
  padding: 1rem 2rem;
  margin: 1rem 1rem;
  z-index: 600;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>