<template>
  <b-container tag="main">
    <b-table :fields="fields" :items="categories"></b-table>
  </b-container>
</template>

<script>
import { BTable } from 'bootstrap-vue'

export default {
  components: {
    BTable
  },
  data() {
    return {
      categories: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Имя', sortable: true },
        { key: 'slug', label: 'URL', sortable: true },
        { key: 'is_income', label: 'Доход', sortable: true },
        { key: 'edit', label: 'Редактировать' }
      ]
    }
  },
  async fetch() {
    this.categories = await this.$http.$get(`${process.env.API_URL}/categories`)
  }
}
</script>
