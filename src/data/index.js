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
});

export const colors = ["azul", "verde", "roxo", "marrom", "vermelho"];

export const clues = [
  {
    advancedMode: false,
    key: 1,
    category: "É um de dois tipos de terreno:",
    values: [
      { clue: "É uma floresta ou um deserto", isPossible: true },
      { clue: "É uma floresta ou um lago", isPossible: true },
      { clue: "É uma floresta ou um pântano", isPossible: true },
      { clue: "É uma floresta ou uma montanha", isPossible: true },
      { clue: "É um deserto ou um lago", isPossible: true },
      { clue: "É um deserto ou um pântano", isPossible: true },
      { clue: "É um deserto ou uma montanha", isPossible: true },
      { clue: "É um lago ou um pântano", isPossible: true },
      { clue: "É um lago ou uma montanha", isPossible: true },
      { clue: "É um pântano ou uma montanha", isPossible: true },
    ],
  },
  {
    advancedMode: false,
    key: 2,
    category:
      "Está a até 1 espaço de um tipo de terreno ou território de animal:",
    values: [
      { clue: "Está a até 1 espaço de uma floresta", isPossible: true },
      { clue: "Está a até 1 espaço de um deserto", isPossible: true },
      { clue: "Está a até 1 espaço de um lago", isPossible: true },
      { clue: "Está a até 1 espaço de um pântano", isPossible: true },
      { clue: "Está a até 1 espaço de uma montanha", isPossible: true },
      {
        clue: "Está a até 1 espaço de um território de animal",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: false,
    key: 3,
    category:
      "Está a até 2 espaços de um tipo de território de animal ou de um tipo de estrutura:",
    values: [
      { clue: "Está a até 2 espaços de uma rocha vertical", isPossible: true },
      {
        clue: "Está a até 2 espaços de uma cabana abandonada",
        isPossible: true,
      },
      {
        clue: "Está a até 2 espaços de um território de puma",
        isPossible: true,
      },
      {
        clue: "Está a até 2 espaços de um território de urso",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: false,
    key: 4,
    category: "Está a até 3 espaços de uma cor de estrutura:",
    values: [
      { clue: "Está a até 3 espaços de uma estrutura azul", isPossible: true },
      {
        clue: "Está a até 3 espaços de uma estrutura branca",
        isPossible: true,
      },
      { clue: "Está a até 3 espaços de uma estrutura verde", isPossible: true },
      { clue: "Está a até 3 espaços de uma estrutura preta", isPossible: true },
    ],
  },
  {
    advancedMode: true,
    key: 5,
    category: "NÃO é um de dois tipos de terreno:",
    values: [
      { clue: "NÃO é uma floresta ou um deserto", isPossible: true },
      { clue: "NÃO é uma floresta ou um lago", isPossible: true },
      { clue: "NÃO é uma floresta ou um pântano", isPossible: true },
      { clue: "NÃO é uma floresta ou uma montanha", isPossible: true },
      { clue: "NÃO é um deserto ou um lago", isPossible: true },
      { clue: "NÃO é um deserto ou um pântano", isPossible: true },
      { clue: "NÃO é um deserto ou uma montanha", isPossible: true },
      { clue: "NÃO é um lago ou um pântano", isPossible: true },
      { clue: "NÃO é um lago ou uma montanha", isPossible: true },
      { clue: "NÃO é um pântano ou uma montanha", isPossible: true },
    ],
  },
  {
    advancedMode: true,
    key: 6,
    category:
      "NÃO está a até 1 espaço de um tipo de terreno ou território de animal:",
    values: [
      { clue: "NÃO está a até 1 espaço de uma floresta", isPossible: true },
      { clue: "NÃO está a até 1 espaço de um deserto", isPossible: true },
      { clue: "NÃO está a até 1 espaço de um lago", isPossible: true },
      { clue: "NÃO está a até 1 espaço de um pântano", isPossible: true },
      { clue: "NÃO está a até 1 espaço de uma montanha", isPossible: true },
      {
        clue: "NÃO está a até 1 espaço de um território de animal",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: true,
    key: 7,
    category:
      "NÃO está a até 2 espaços de um tipo de território de animal ou de um tipo de estrutura:",
    values: [
      {
        clue: "NÃO está a até 2 espaços de uma rocha vertical",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 2 espaços de uma cabana abandonada",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 2 espaços de um território de puma",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 2 espaços de um território de urso",
        isPossible: true,
      },
    ],
  },
  {
    advancedMode: true,
    key: 8,
    category: "NÃO está a até 3 espaços de uma cor de estrutura:",
    values: [
      {
        clue: "NÃO está a até 3 espaços de uma estrutura azul",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 3 espaços de uma estrutura branca",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 3 espaços de uma estrutura verde",
        isPossible: true,
      },
      {
        clue: "NÃO está a até 3 espaços de uma estrutura preta",
        isPossible: true,
      },
    ],
  },
];
