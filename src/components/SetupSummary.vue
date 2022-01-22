<template>
  <div class="container root">
    <h2>Configurações</h2>
    
    <summary-group>
      <h3>Sua cor</h3>
      <prompt-button :color="gameSetup.player.color" @click="goTo('select-player-color')">
        <span>{{ gameSetup.player.color }}</span>
        <img :src="cog" alt="escolher a sua cor">
      </prompt-button>
    </summary-group>

    <summary-group>
      <h3>Sua pista</h3>
      <button class="clue" @click="goTo('select-player-clue')">
        <span>{{ gameSetup.player.clue && gameSetup.player.clue.value }}</span>
        <img :src="cogBlack" alt="escolher a sua pista">
      </button>
    </summary-group>

    <summary-group>
      <h3>Demais jogadores</h3>
      <div class="adversaries">
        <prompt-button v-for="player in gameSetup.otherPlayers" :key="player.color" :color="player.color" @click="goTo('select-adversaries')">{{ player.color }}</prompt-button>
        <button class="cog" @click="goTo('select-adversaries')"><img :src="cog" alt="escolher outros jogadores"></button>
      </div>
    </summary-group>

    <summary-group class="mb-6">
      <h3>Modo avançado</h3>
      <button @click="toggleAdvancedMode" class="advanced-button adversaries" :class="{ on: gameSetup.advancedMode }">
        <span>{{ gameSetup.advancedMode ? "habilitado" : "desabilitado" }}</span>
        <img :src="currCog" alt="alternar modo avançado">
      </button>
    </summary-group>

    <summary-group class="auto-top">
      <button class="start-button" @click="startGame">Iniciar</button>
    </summary-group>
  </div>
</template>

<script>
import { gameSetup, toast } from "@/data"
import PromptButton from "@/components/PromptButton.vue"
import SummaryGroup from "@/components/SummaryGroup.vue"
import cog from "@/assets/configuration.png"
import cogBlack from "@/assets/configuration-black.png"
export default {
  components: {
    PromptButton,
    SummaryGroup
  },

  data () {
    return {
      gameSetup,
      toast,
      cog,
      cogBlack
    }
  },

  computed: {
    currCog () {
      return gameSetup.advancedMode ? cog : cogBlack
    }
  },

  methods: {
    goTo (where) {
      gameSetup.currentSetupPhase = where
    },

    toggleAdvancedMode () {
      gameSetup.advancedMode = !gameSetup.advancedMode
      if (!gameSetup.advancedMode && gameSetup.player.clue.advancedMode) {
        gameSetup.player.clue = null
        toast.notify("A sua pista é do modo avançado. Escolha outra pista.")
        this.goTo("select-player-clue")
      }
    },

    startGame () {
      gameSetup.currentSetupPhase = null
      localStorage.setItem("currentGame", JSON.stringify(gameSetup))
      this.$router.push("/play")
    }
  }
}
</script>

<style scoped>
h2,
h3 {
  text-align: center;
}

img {
  max-width: 1rem;
  height: auto;
}

.clue {
  padding: 0.5rem 2rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  text-decoration: underline;
  text-decoration-color: #70bdce;
  text-decoration-style: dashed;
}

.adversaries {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.advanced-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10rem;
  background: #ddd;
  color: #444;
  text-transform: uppercase;
  gap: 0.5rem;
}

.on {
  background: rgb(93, 158, 8);
  color: white;
}

.start-button {
  background: #197ade;
  color: white;
  padding: 1em 2em;
  border: none;
  border-radius: 10rem;
  text-transform: uppercase;
  font-size: 1.5rem;
}

.auto-top {
  margin-top: auto;
}

.cog {
  background: black;
  border: none;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem;
}

</style>