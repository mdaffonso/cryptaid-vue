<template>
  <div class="container root">
    <button @click="setLocale('en')"><img :src="en" alt="english"></button>
    <button @click="setLocale('pt')"><img :src="pt" alt="português"></button>
  </div>
</template>

<script>
import pt from "@/assets/pt.png"
import en from "@/assets/en.png"
import { gameSetup } from "@/data"
import { useSetupRedirect } from '@/composables'
export default {
  data () {
    return {
      pt,
      en
    }
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
      gameSetup.locale = locale
      localStorage.setItem("locale", locale)
      useSetupRedirect()
    }
  }
}
</script>

<style scoped>
button {
  margin: 1rem;
  padding: 1rem;
  background: transparent;
  border: none;
}

img {
  max-width: 5rem;
  height: auto;
}

.container {
  justify-content: center;
}

@media (min-width: 700px) {
  .container {
    flex-flow: row wrap;
  }
}
</style>