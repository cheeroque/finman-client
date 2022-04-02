<template>
  <div class="app-wrapper">
    <Nuxt class="app-content" />
    <ToastMessage :timeout="false" bottom-offset="0" />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  padding: $grid-gap ($grid-gap * 0.5);
}

@include media-min-width('lg') {
  .app-wrapper {
    justify-content: center;
    min-height: 100vh;
  }

  .app-content {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
