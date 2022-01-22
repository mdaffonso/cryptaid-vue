<template>
  <button @click="next">></button>
</template>

<script>
import ToastNotification from "@/components/ToastNotification.vue"
import { useSetupRedirect } from "@/composables"
export default {
  components: {
    ToastNotification
  },
  
  props: {
    error: {
      type: String,
      required: false
    },

    condition: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  methods: {
    next() {
      useSetupRedirect(this.condition, this.error)
    }
  }
}
</script>

<style scoped>
button {
  height: 3rem;
  width: 3rem;
  border: none;
  border-radius: 50%;
  background: black;
  color: white;
  margin: 3rem auto;
  font-size: 2rem;
  font-weight: 700;
  transform: scale(1.5);
  font-family: Courgette, 'sans-serif';
}

button:active {
  transform: translateY(1px) scale(1.4);
}
</style>