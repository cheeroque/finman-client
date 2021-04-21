<template>
  <b-container tag="main">
    <b-table :fields="fields" :items="records.data" @sort-changed="onTableSort"></b-table>
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
      records: [],
      fields: [
        { key: 'created_at', label: 'Дата', sortable: true },
        { key: 'sum', label: 'Сумма', sortable: true },
        { key: 'category_id', label: 'Категория', sortable: true },
        { key: 'note', label: 'Комментарий' },
        { key: 'edit', label: 'Редактировать' }
      ]
    }
  },
  watchQuery: true,
  async fetch() {
    this.records = await this.$http.$get(`${process.env.API_URL}/records?${this.query}`)
  },
  computed: {
    query() {
      return Object.keys(this.$route.query)
        .map((key) => `${key}=${this.$route.query[key]}`)
        .join('&')
    }
  },
  methods: {
    onTableSort(event) {
      this.$router.push({ query: { orderBy: event.sortBy, order: event.sortDesc ? 'DESC' : 'ASC' } })
      this.$fetch()
    }
  }
}
</script>
