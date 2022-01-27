<template>
  <router-view />
</template>

<script>
export default {
  beforeMount () {
    window.addEventListener('load', function() {
      window.history.pushState({ noBackExitsApp: true }, '')
    })

    window.addEventListener('popstate', function(event) {
      if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, '')
      }
    })
  }
}
</script>
