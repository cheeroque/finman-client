<template>
  <header class="page-header-main">
    <h1 class="mb-0">
      <transition name="fade" mode="out-in">
        <span v-if="$fetchState.pending">&nbsp;</span>
        <nuxt-link v-else :to="localePath('/')">
          {{ formatSum(total, $i18n.locale) }}&nbsp;₽
        </nuxt-link>
      </transition>
    </h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatSum } from '@/utils'

export default {
  async fetch() {
    await this.$store.dispatch('fetchTotal')
  },
  computed: {
    ...mapGetters(['total']),
  },
  methods: {
    formatSum,
  },
}
</script>

<style lang="scss" scoped>
.page-header-main {
  color: $header-color;
  background-color: $header-bg;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;

  a:hover {
    text-decoration: none;
  }
}

@include media-min-width('md') {
  .page-header-main {
    padding: 0;
    margin-bottom: 1rem;
  }
}

@include media-min-width('xl') {
  .page-header-main {
    flex: 0 0 auto;
    margin: 0 auto 0 0;
  }
}
</style>
