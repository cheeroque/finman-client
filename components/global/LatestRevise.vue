<template>
  <li class="nav-item">
    <a href="#" class="nav-link" @click="$root.$emit('revise-edit', latestRevise)">
      <span v-if="latestRevise && latestRevise.created_at">
        {{
          $dateWithFormat(latestRevise.created_at, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </span>
      <span v-else class="text-muted">нет данных</span>
    </a>
  </li>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('fetchLatestRevise')
  },
  data() {
    return {
      modalShow: false
    }
  },
  computed: {
    latestRevise() {
      return this.$store.state.latestRevise
    }
  },
  methods: {
    refresh() {
      this.modalShow = false
      this.$fetch()
    }
  }
}
</script>
