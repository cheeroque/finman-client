<template>
  <header class="app-header">
    <h1>
      <b-link to="/"> Баланс: {{ total }} </b-link>
    </h1>
  </header>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.state.total
    }
  }
}
</script>
