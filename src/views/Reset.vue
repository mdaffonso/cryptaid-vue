<template>
  <div></div>
</template>

<script>
import { useReset } from "@/composables"
export default {
  mounted () {
    useReset()
    this.$router.push("/")
  }
}
</script>