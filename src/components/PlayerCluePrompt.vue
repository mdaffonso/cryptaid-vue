<template>
  <div class="root container">
    <h2>Qual é a sua pista?</h2>
    <div v-for="group in clues" :key="group.key">
      <div v-if="checkAdvancedMode(group)" class="category">
        <h3>{{ group.category }}</h3>
        <button v-for="item in group.values" :key="item.clue" @click="setPlayerClue({ value: item.clue, advancedMode: group.advancedMode })">{{ item.clue }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { clues, gameSetup } from "@/data";
import { useSetupRedirect } from '@/composables';
export default {
  data() {
    return {
      clues,
    };
  },

  methods: {
    setPlayerClue(clue) {
      gameSetup.player.clue = clue
      if(clue.advancedMode) {
        gameSetup.advancedMode = true
      }

      useSetupRedirect()
    },

    checkAdvancedMode(item) {
      return !item.advancedMode || (item.advancedMode && gameSetup.advancedMode !== false)
    }
  }
};
</script>

<style scoped>
  .category {
    margin: 2rem 0;
    max-width: 30ch;
  }

  button {
    text-align: left;
    background: transparent;
    border: none;
    text-decoration: underline;
    text-decoration-color: #70bdce;
    text-decoration-style: dashed;
    padding: 0.25rem;
    font-size: 1.15rem;
  }
</style>
