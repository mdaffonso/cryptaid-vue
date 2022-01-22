<template>
  <div class="root container black">
    <button @click="resetGame" class="reset">Jogar de novo</button>
    <button @click="showEnd" class="show-end" :class="{ disabled: !allowEnd }">Mostrar somente dicas finais</button>
  </div>
</template>

<script>
import { gameSetup, toast } from '@/data'
export default {
  props: {
    allowEnd: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    resetGame () {
      const resetMatrix = {
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

      this.$router.push("/")
    },

    showEnd () {
      if (!this.allowEnd) {
        toast.notify("Esta opção estará disponível quando houver somente 1 dica de cada jogador restando.")
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
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>