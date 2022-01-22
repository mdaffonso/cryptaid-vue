<template>
  <div class="root container screen" :class="color">
    <h3>Pistas {{ !showRemoved ? "Possíveis" : "Removidas" }}</h3>

    <div v-if="!showRemoved" class="block">
      <div v-for="category in clues" :key="category.key" class="block">
        <transition name="fade">
          <div v-if="category.values.find(c => c.isPossible)" class="block">
            <h3>{{ category.category }}</h3>
            <div class="column">
              <span v-for="value in category.values" :key="value.clue">
                <transition name="fade">
                  <button  @click="toggleClue(category.key, value.clue)" v-if="value.isPossible">{{ value.clue }}</button>
                </transition>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="showRemoved" class="block">
      <div v-for="category in clues" :key="category.key" class="block">
        <transition name="fade">
          <div v-if="category.values.find(c => !c.isPossible)" class="block">
            <h3>{{ category.category }}</h3>
            <div class="column">
              <span v-for="value in category.values" :key="value.clue">
                <transition name="fade">
                  <button class="removed" @click="toggleClue(category.key, value.clue)" v-if="!value.isPossible">{{ value.clue }}</button>
                </transition>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- <button v-if="!noneRemoved" class="show-removed" @click="toggleRemoved">{{ !showRemoved ? "Mostrar pistas removidas" : "Mostrar pistas possíveis" }}</button> -->
  </div>
</template>

<script>
import { colors, gameSetup } from '@/data'
export default {
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

    noneRemoved () {
      if (JSON.stringify(this.clues).indexOf('"isPossible":false') === -1) {
        this.showRemoved = !this.showRemoved
        return true
      }
      return false
    }
  },

  methods: {
    toggleClue (category, clue) {
      const fullClue = this.clues.find(c => c.key === category).values.find(v => v.clue === clue)
      fullClue.isPossible = !fullClue.isPossible
    },

    toggleRemoved () {
      this.showRemoved = !this.showRemoved
    }
  }
}
</script>

<style scoped>
button {
  text-align: left;
  background: transparent;
  border: none;
  text-decoration: underline;
  text-decoration-color: #cecc70;
  text-decoration-style: dashed;
  padding: 0.25rem;
  font-size: 1.15rem;
  color: white;
  font-weight: 300;
  z-index: 150;
}

.removed {
  opacity: 50%;
}

.container {
  align-items: flex-start;
}

.screen {
  width: 100%;
  height: 100vh;
  color: white;
  overflow-y: scroll;
  z-index: 100;

  scrollbar-color: white transparent;
  scrollbar-width: thin;
}

.block {
  width: 100%;
}

.column {
  display: flex;
  flex-flow: column;
}

.block:last-of-type {
  margin-bottom: 2rem;
}

.show-removed {
  background: black;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  margin-top: auto;
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.85rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
