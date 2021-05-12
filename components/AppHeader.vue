<template>
  <header class="app-header">
    <h1>
      <b-link to="/"> Баланс: {{ total }} </b-link>
    </h1>
    <b-link @click="logout"> Выйти </b-link>
  </header>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.state.total
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout().then(() => {
        this.$auth.setUser(false)
      })
    }
  }
}
</script>
