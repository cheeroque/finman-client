<template>
  <b-container tag="main">
    <b-table :fields="fields" :items="records"></b-table>
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
  async fetch() {
    this.records = await this.$http.$get(`${process.env.API_URL}/records`)
  }
}
</script>
