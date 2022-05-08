<template>
  <li role="presentation">
    <button :title="snapshotText" class="nav-item" @click="showDialog">
      <svg-icon name="datetime-24" width="24" height="24" aria-hidden="true" />
      <slot>{{ snapshotText }}</slot>
    </button>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatSum } from '@/utils'

export default {
  computed: {
    ...mapGetters(['latestSnapshot']),
    snapshotText() {
      if (!this.latestSnapshot?.balance) return this.$t('noData')
      const sum = this.formatSum(
        this.latestSnapshot?.balance || 0,
        this.$i18n.locale
      )
      const date = this.formatDate(
        this.latestSnapshot.created_at,
        this.$i18n.locale
      )
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
        { title: this.$t('snapshot.new') }
      )
    },
  },
}
</script>
