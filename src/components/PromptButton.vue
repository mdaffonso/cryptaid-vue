<template>
  <button class="prompt-button" :class="color">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  },
};
</script>

<style>
.prompt-button {
  padding: 1rem 2rem;
  color: white;
  background: rgb(39, 39, 39);
  text-transform: uppercase;
  margin: 0.25rem;
  border: none;
  border-radius: 10rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

</style>
