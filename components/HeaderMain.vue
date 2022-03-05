<template>
  <header class="header header-main">
    <h1>{{ formatSum(total) }}&nbsp;₽</h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatSum } from '@/utils'

export default {
  computed: {
    ...mapGetters(['total']),
  },
  methods: {
    formatSum,
  },
}
</script>
