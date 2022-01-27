<template>
  <div class="root container screen" :class="color" @scroll="handleScroll">
    <transition name="slide" mode="out-in">
      <div :key="`alternate-${showRemoved}`">
        <h3 class="game-screen-title">{{ !showRemoved ? $t('game.possibleClues') : $t('game.removedClues') }}</h3>

        <clues-category @toggle-clue="handleToggleClue" v-for="category in clues" :key="category.key" :group="category" :removed="showRemoved"></clues-category>
        <p class="none-to-show" v-if="noneToShow">{{ showRemoved ? $t('game.noCluesRemovedPTag') : $t('game.noCluesAvailablePTag') }}</p>
        <button class="show-removed" @click="toggleRemoved">{{ !showRemoved ? $t('game.showRemovedCluesButton') : $t('game.showPossibleCluesButton') }}</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { colors, gameSetup } from '@/data'
import { useDimensions } from "@/composables"
import CluesCategory from "@/components/CluesCategory.vue"
export default {
  components: {
    CluesCategory
  },

  data () {
    return {
      showRemoved: false
    }
  },

  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => colors.includes(value)
    }
  },

  computed: {
    clues () {
      return gameSetup.otherPlayers.find(p => p.color === this.color).clues
    },

    noneToShow () {
      return this.showRemoved ? this.clues.every(c => c.values.every(p => p.isPossible)) : this.clues.every(c => c.values.every(p => !p.isPossible))
    }
  },

  methods: {
    toggleClue (category, clue) {
      const fullClue = this.clues.find(c => c.key === category).values.find(v => v.clue === clue)
      fullClue.isPossible = !fullClue.isPossible
    },

    toggleRemoved () {
      this.showRemoved = !this.showRemoved
    },

    handleScroll (e) {
      e.stopPropagation()
    },

    handleToggleClue (a, b) {
      this.toggleClue(a, b)
    }
  },

  setup () {
    const { height: windowHeight } = useDimensions()
    return { windowHeight }
  }
}
</script>

<style scoped>
.game-screen-title {
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 2.5rem;
}

.container {
  align-items: flex-start;
}

.screen {
  width: 100%;
  height: 100vh;
  color: white;
  overflow-y: scroll;
  z-index: 500;

  scrollbar-color: white transparent;
  scrollbar-width: thin;
}

.none-to-show {
  padding: 1rem 0;
  font-size: 1.2rem;
  opacity: 0.75;
  font-style: italic;
  font-weight: 300;
}

.show-removed {
  background: black;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.85rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: 100ms ease;
  transition-property: transform, opacity;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-enter-from {
  transform: translateY(2rem);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>
