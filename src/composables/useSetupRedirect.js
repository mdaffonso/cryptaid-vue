import { gameSetup, toast } from "@/data"

const useSetupRedirect = (condition = true, error = null) => {

  const redirectMatrix = {
    playerColor: {
      valid: !!gameSetup.player.color,
      redirect: "select-player-color"
    },
    playerClue: {
      valid: !!gameSetup.player.clue,
      redirect: "select-player-clue"
    },
    otherPlayers: {
      valid: gameSetup.otherPlayers.length >= 2,
      redirect: "select-adversaries"
    },
    advancedMode: {
      valid: typeof gameSetup.advancedMode === "boolean",
      redirect: "select-advanced-mode"
    }
  }

  if (!condition) {
    toast.notify(error)
    return
  }
  
  const invalidSetup = Object.entries(redirectMatrix).find(value => !value[1].valid)

  if (invalidSetup) {
    gameSetup.currentSetupPhase = invalidSetup[1].redirect
  } else {
    gameSetup.currentSetupPhase = "setup-summary"
  }
}

export { useSetupRedirect }