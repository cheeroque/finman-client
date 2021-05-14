<template>
  <b-container tag="header" class="app-header px-lg-24" fluid>
    <h1>
      <transition name="fade" mode="out-in">
        <b-link v-if="total" :key="total" to="/" class="text-reset text-decoration-none"> {{ total }}&nbsp;₽ </b-link>
        <span v-else>&nbsp;</span>
      </transition>
    </h1>
  </b-container>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.state.total
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: $gray-100;

  h1 {
    margin: 0;
    font-size: 2rem;
    line-height: 1.25;
    color: $gray-600;
  }
}

@include media-breakpoint-up(lg) {
  .app-header {
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: transparent;

    h1 {
      font-size: 3rem;
      color: $primary;
    }
  }
}
</style>
