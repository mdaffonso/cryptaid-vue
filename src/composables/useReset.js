import { gameSetup } from "@/data"
const useReset = () => {
  const resetMatrix = {
    locale: gameSetup.locale,
    incompatibles: gameSetup.incompatibles,
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
}

export { useReset }