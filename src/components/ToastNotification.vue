<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  width: calc(100vw - 2rem);
  background: black;
  color: white;
  padding: 2rem;
  border-radius: 0.25rem;
  animation:
    show 300ms ease-in-out forwards,
    hide 300ms 3.7s ease-in-out forwards;
  transform: translateX(-50%);
  box-shadow: 0 -1rem 1rem rgba(78, 0, 88, 0.15);
  z-index: 9999;
}

@media (min-width: 700px) {
  .toast {
    width: max-content;
    max-width: 30ch;
  }
}

@keyframes show {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes hide {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) translateY(1rem);
  }
}
</style>