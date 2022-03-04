<template>
  <header class="header header-main">
    <h1>{{ formatSum(total) }}&nbsp;₽</h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['total'])
  },
  methods: {
    formatSum(number) {
      return parseInt(number || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })
    }
  }
}
</script>
