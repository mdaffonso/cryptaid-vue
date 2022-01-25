<template>
  <div class="game-base">
    <swiper 
      :slides-per-view="1" 
      :space-between="0" 
      :observer="true" 
      v-if="phoneMode" >

      <swiper-slide v-for="screen in gameSetup.screenOrder" :key="screen.color">
        <component :is="screen.component" :color="screen.color"></component>
      </swiper-slide>
      
      <swiper-slide key="config">
        <config-screen :allowButton="allowEnd" @showEndEvent="showEndScreen"></config-screen>
      </swiper-slide>
      
    </swiper>

    <div v-else class="large-screen">
      <component :is="screen.component" class="column" :color="screen.color" v-for="screen in gameSetup.screenOrder" :key="screen.color"></component>
      <config-screen :allowButton="allowEnd" @showEndEvent="showEndScreen"></config-screen>
    </div>
  </div>
  
  <div v-if="showFinalScreen && allowEnd" class="pre-end" :class="{ out: animateOut }">
    <button @click="hideFinalScreen">×</button>
    <div class="stripe" :class="gameSetup.player.color && gameSetup.player.color">
      <p v-if="gameSetup.player.clue">{{ $t(`clues.clues.${gameSetup.player.clue.value}`) }}</p>
    </div>
    <div class="stripe" v-for="player in filteredClues" :class="player.player" :key="player.player">
      <p v-if="player.cluesLeft[0]">{{ player.cluesLeft[0] }}</p>
      <p v-else class="no-clues">Não há pistas possíveis para este jogador. Deveria haver pelo menos uma. Verifique novamente o tabuleiro.</p>
    </div>
  </div>

  <teleport to="#notifications" v-if="toast.notificationMessage">
    <toast-notification>{{ toast.notificationMessage }}</toast-notification>
  </teleport>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { gameSetup, toast } from '@/data'
import GameScreenYou from "@/components/GameScreenYou.vue"
import GameScreenAdversary from "@/components/GameScreenAdversary.vue"
import ConfigScreen from "@/components/ConfigScreen.vue"
import ToastNotification from '@/components/ToastNotification.vue';
import { useDimensions } from "@/composables"
import "swiper/swiper-bundle.min.css"

export default {
  components: {
    GameScreenYou,
    GameScreenAdversary,
    Swiper,
    SwiperSlide,
    ConfigScreen,
    ToastNotification
  },

  data () {
    return {
      gameSetup,
      screenComponent: "game-screen-you",
      screenColor: gameSetup.player.color,
      swipeLeft: false,
      swipeRight: false,
      showFinalScreen: true,
      animateOut: false,
      toast
    }
  },

  computed: {
    allowEnd () {
      let counter = {
        playersWithCluesLeft: new Set(this.filteredClues.map(fc => fc.player)),
        totalCluesLeft: 0
      }

      for (let player of this.filteredClues) {
        if (player.cluesLeft.length < 1) {
          counter.playersWithCluesLeft.delete(player.player)
        } else {
          counter.playersWithCluesLeft.add(player.player)
        }
        counter.totalCluesLeft += player.cluesLeft.length
      }

      if (counter.totalCluesLeft === 0) {
        return false
      }

      return counter.playersWithCluesLeft.size === counter.totalCluesLeft
    },

    filteredClues () {
      const filtered = []
      for (let player of gameSetup.otherPlayers) {
        const obj = { player: player.color, cluesLeft: [] }
        player.clues.forEach(group => {
          const cluesStillPossible = group.values.filter(clue => clue.isPossible)
          obj.cluesLeft.push(...cluesStillPossible.map(clue => this.$t(`clues.clues.${clue.clue}`)))
        })
        filtered.push(obj)
      }
      return filtered
    },

    phoneMode () {
      return this.width >= 700 ? false : true
    }
  },

  mounted () {
    const currentGame = JSON.parse(localStorage.getItem("currentGame"))

    if (!currentGame) {
      this.$router.push("/")
      return
    }

    if (this.width < 700) {
      toast.notify(this.$t('warnings.swipeToNavigate'))
    }

    Object.entries(currentGame).forEach(p => {
      gameSetup[p[0]] = p[1]
    })

    this.screenColor = gameSetup.player.color
    gameSetup.screenOrder = []
    gameSetup.screenOrder[0] = { component: "game-screen-you", color: gameSetup.player.color }

    if (!gameSetup.advancedMode) {
      for (let [index, player] of gameSetup.otherPlayers.entries()) {
        const sliced = gameSetup.otherPlayers[index].clues = player.clues.slice(0, 4)
        sliced[3].values = sliced[3].values.slice(0, 3)
      }
    }

    gameSetup.otherPlayers.forEach(p => {
      for (let clueCategory of p.clues) {
        const foundTheClue = clueCategory.values.find(c => c.clue === gameSetup.player.clue.value)
        if (foundTheClue) {
          foundTheClue.isPossible = !foundTheClue.isPossible
        }
      }

      gameSetup.screenOrder.push({ 
        ...p,
        component: "game-screen-adversary"
      })
    })

  },

  beforeMount () {
    window.addEventListener("beforeunload", this.preventNav)
  },

  beforeUnmount () {
    window.removeEventListener("beforeunload", this.preventNav)
  },

  methods: {
    preventNav (e) {
      e.returnValue = this.$t('warnings.leavingScreen')
    },

    hideFinalScreen () {
      const that = this
      if (timer) return
      this.animateOut = true
      const timer = setTimeout(() => {
        that.showFinalScreen = false
        that.animateOut = false
      }, 300)
    },

    showEndScreen () {
      this.showFinalScreen = true
    }
  },

  setup () {
    const { width } = useDimensions()
    return { width }
  },

  beforeRouteLeave (_, _2, next) {
    const leave = confirm(this.$t('warnings.leavingScreen'))
    next(leave)
  }
}
</script>

<style scoped>
.game-base {
  background: rgb(46, 46, 46);
}

.pre-end {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  width: 100vw;
  height: 100vh;

  z-index: 600;

  transform-origin: right center;

  animation: fadeIn 300ms ease-in-out forwards;
}

.out {
  animation: fadeOut 300ms ease-in-out forwards;
}

.pre-end div {
  flex: 1 1 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  font-weight: 300;
  font-size: 1.2rem;
}

.pre-end button {
  position: absolute;
  top: 0.5rem;
  left: 50%;

  background: black;
  color: white;

  border: none;
  border-radius: 50%;

  height: 3rem;
  width: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(-50%);

  z-index: 1000;
}

.no-clues {
  opacity: 0.5;
  font-style: italic;
  font-size: 0.9rem;
}

.large-screen {
  display: flex;
  flex-flow: row nowrap;
}

.column {
  display: flex;
  flex-flow: column;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.75);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.75);
  }
}

@media (min-width: 700px) {
  .pre-end {
    flex-flow: row nowrap;
  }
}
</style>