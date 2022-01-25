import { reactive } from "vue";

export const toast = reactive({
  notificationMessage: null,
  notify: function (message) {
    if (this.notificationMessage) return
    const that = this
    this.notificationMessage = message
    const timer = setTimeout(() => {
      that.notificationMessage = null
    }, 4000)
  }
})

export const gameSetup = reactive({
  locale: localStorage.getItem("locale"),
  player: {
    color: null,
    clue: null,
  },
  otherPlayers: [],
  advancedMode: null,
  currentSetupPhase: localStorage.getItem("locale") ? "select-player-color" : "locale-prompt",
  screenOrder: []
});

export const colors = ["blue", "green", "purple", "brown", "red"];

export const clues = [
  {
    advancedMode: false,
    key: 1,
    category: "alternateTerrains",
    values: [
      { clue: "fd", isPossible: true },
      { clue: "fl", isPossible: true },
      { clue: "fs", isPossible: true },
      { clue: "fm", isPossible: true },
      { clue: "dl", isPossible: true },
      { clue: "ds", isPossible: true },
      { clue: "dm", isPossible: true },
      { clue: "ls", isPossible: true },
      { clue: "lm", isPossible: true },
      { clue: "sm", isPossible: true },
    ],
  },
  {
    advancedMode: false,
    key: 2,
    category:
      "withinOne",
    values: [
      { clue: "oneF", isPossible: true },
      { clue: "oneD", isPossible: true },
      { clue: "oneL", isPossible: true },
      { clue: "oneS", isPossible: true },
      { clue: "oneM", isPossible: true },
      {
        clue: "oneA",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: false,
    key: 3,
    category:
      "withinTwo",
    values: [
      { clue: "twoStone", isPossible: true },
      {
        clue: "twoShack",
        isPossible: true,
      },
      {
        clue: "twoCougar",
        isPossible: true,
      },
      {
        clue: "twoBear",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: false,
    key: 4,
    category: "withinThree",
    values: [
      { clue: "threeBlue", isPossible: true },
      {
        clue: "threeWhite",
        isPossible: true,
      },
      { clue: "threeGreen", isPossible: true },
      { clue: "threeBlack", isPossible: true },
    ],
  },
  {
    advancedMode: true,
    key: 5,
    category: "notAlternateTerrains",
    values: [
      { clue: "nfd", isPossible: true },
      { clue: "nfl", isPossible: true },
      { clue: "nfs", isPossible: true },
      { clue: "nfm", isPossible: true },
      { clue: "ndl", isPossible: true },
      { clue: "nds", isPossible: true },
      { clue: "ndm", isPossible: true },
      { clue: "nls", isPossible: true },
      { clue: "nlm", isPossible: true },
      { clue: "nsm", isPossible: true },
    ],
  },
  {
    advancedMode: true,
    key: 6,
    category:
      "notWithinOne",
    values: [
      { clue: "nOneF", isPossible: true },
      { clue: "nOneD", isPossible: true },
      { clue: "nOneL", isPossible: true },
      { clue: "nOneS", isPossible: true },
      { clue: "nOneM", isPossible: true },
      {
        clue: "nOneA",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: true,
    key: 7,
    category:
      "notWithinTwo",
    values: [
      {
        clue: "nTwoStone",
        isPossible: true,
      },
      {
        clue: "nTwoShack",
        isPossible: true,
      },
      {
        clue: "nTwoCougar",
        isPossible: true,
      },
      {
        clue: "nTwoBear",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: true,
    key: 8,
    category: "notWithinThree",
    values: [
      {
        clue: "nThreeBlue",
        isPossible: true,
      },
      {
        clue: "nThreeWhite",
        isPossible: true,
      },
      {
        clue: "nThreeGreen",
        isPossible: true,
      },
      {
        clue: "nThreeBlack",
        isPossible: true,
      },
    ],
  },
];
