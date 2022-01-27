<template>
  <transition name="fade">
    <div v-if="showGroup" class="block">
      <h3>{{ $t(`clues.groups.${group.category}`) }}</h3>
      <transition-group tag="div" class="column" name="fade">
        <button 
          v-for="value in filteredGroup" 
          @click="emitClick(group.key, value.clue)" 
          class="clue-button" 
          :class="{ removed }"
          :key="value.clue">{{ $t(`clues.clues.${value.clue}`) }}</button>
      </transition-group>
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
    },
    filteredGroup () {
      return this.group.values.filter(v => this.removed ? !v.isPossible : v.isPossible)
    }
  },

  methods: {
    emitClick (group, clue) {
      this.$emit("toggle-clue", group, clue)
    }
  }
}
</script>

<style scoped>
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
  transition: opacity 200ms ease;
}
  
.fade-leave-active {
  position: absolute;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: transform 200ms ease;
}
</style>