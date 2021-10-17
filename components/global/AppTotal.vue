<template>
  <h1 class="app-total">
    <transition name="fade" mode="out-in">
      <nuxt-link :key="total" to="/" class="text-reset text-hover-primary text-decoration-none">
        {{ parseInt(total || 0) }}&nbsp;₽
      </nuxt-link>
    </transition>
  </h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['total'])
  }
}
</script>

<style lang="scss" scoped>
.app-total {
  margin: 0;
  font-size: 3rem;
  font-weight: $font-weight-light;
  line-height: 1;
}

@media (min-width: 992px) {
  .app-total {
    font-size: 4.5rem;
  }
}
</style>
