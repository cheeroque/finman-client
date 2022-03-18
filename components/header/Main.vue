<template>
  <header class="header header-main">
    <h1 class="mb-0">
      <nuxt-link to="/"> {{ formatSum(total, locale) }}&nbsp;₽ </nuxt-link>
    </h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatSum } from '@/utils'

export default {
  computed: {
    ...mapGetters(['locale', 'total']),
  },
  methods: {
    formatSum,
  },
}
</script>
