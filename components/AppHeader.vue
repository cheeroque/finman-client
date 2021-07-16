<template>
  <b-container tag="header" class="app-header d-lg-none" fluid>
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
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: $primary-light;
  background-image: linear-gradient(to bottom right, $primary-light, $primary);

  h1 {
    margin: 0;
    font-size: 2rem;
    line-height: 1.25;
    color: $white;
  }
}
</style>
