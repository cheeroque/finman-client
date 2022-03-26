<template>
  <button class="nav-item" @click="showDialog">
    <svg-icon name="datetime-24" width="24" height="24" aria-hidden="true" />
    <slot>{{ snapshotText }}</slot>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatSum } from '@/utils'

export default {
  computed: {
    ...mapGetters(['latestSnapshot', 'locale']),
    snapshotText() {
      const sum = this.formatSum(this.latestSnapshot?.balance || 0, this.locale)
      const date = this.formatDate(this.latestSnapshot.created_at, this.locale)
      return `${sum}\xA0₽, ${date}`
    },
  },
  methods: {
    formatDate,
    formatSum,
    showDialog() {
      this.$dialog(
        'SnapshotForm',
        { snapshot: this.latestSnapshot },
        { title: 'Новый снапшот' }
      )
    },
  },
}
</script>
