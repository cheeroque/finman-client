<template>
  <header class="app-header">
    <h1>Баланс: {{ total }}</h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      total: null
    }
  },
  async fetch() {
    await this.getTotal()
  },
  mounted() {
    this.$root.$on('refetch', () => {
      this.$fetch()
    })
  },
  methods: {
    async getTotal() {
      this.total = await this.$http.$get(`${process.env.API_URL}/total`)
    }
  }
}
</script>
