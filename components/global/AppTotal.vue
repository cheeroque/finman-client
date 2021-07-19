<template>
  <transition name="fade" mode="out-in">
    <b-link v-if="total" :key="total" to="/" class="text-reset text-decoration-none"> {{ total }}&nbsp;₽ </b-link>
    <span v-else>&nbsp;</span>
  </transition>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('fetchTotal')
  },
  computed: {
    total() {
      return this.$store.state.total
    }
  }
}
</script>
