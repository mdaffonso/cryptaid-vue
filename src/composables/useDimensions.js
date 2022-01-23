import { computed, onMounted, onUnmounted, ref } from "vue"

const useDimensions = () => {
  let windowWidth = ref(window.innerWidth)
  let windowHeight = ref(window.innerHeight)

  const onWidthChange = () => windowWidth.value = window.innerWidth
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const onHeightChange = () => windowHeight.value = window.innerHeight
  onMounted(() => window.addEventListener('resize', onHeightChange))
  onUnmounted(() => window.removeEventListener('resize', onHeightChange))

  const width = computed(() => windowWidth.value)
  const height = computed(() => windowHeight.value)

  return { width, height }
}

export { useDimensions }