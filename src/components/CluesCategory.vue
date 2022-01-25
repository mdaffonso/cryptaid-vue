<template>
  <transition name="fade">
    <div v-if="showGroup" class="block">
      <h3>{{ $t(`clues.groups.${group.category}`) }}</h3>
      <div class="column">
        <span v-for="value in group.values" :key="value.clue">
          <transition name="fade">
            <button  @click="emitClick(group.key, value.clue)" v-if="showValue(value.isPossible)" class="clue-button" :class="{ removed }">{{ $t(`clues.clues.${value.clue}`) }}</button>
          </transition>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    },
    removed: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    showGroup () {
      const removed = this.removed
      return !this.group.values.every(c => c.isPossible === removed)
    }
  },

  methods: {
    emitClick (group, clue) {
      this.$emit("toggle-clue", group, clue)
    },

    showValue (bool) {
      return this.removed ? !bool : bool
    }
  }
}
</script>

<style>
.block {
  width: 100%;
}

.column {
  display: flex;
  flex-flow: column;
}

.clue-button {
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
  opacity: 0.7;
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