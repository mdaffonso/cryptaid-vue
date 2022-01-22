<template>
  <div class="summary-group">
    <slot></slot>
  </div>
</template>


<style>
.summary-group {
  margin: 1rem 0;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.summary-group > * {
  margin: 0.25rem 0
}
</style>