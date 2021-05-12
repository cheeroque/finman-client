<template>
  <b-container tag="main">
    <b-table :fields="groupFields" :items="groupedRecords">
      <template #cell(expand)="{ toggleDetails }">
        <b-link @click="toggleDetails"> + </b-link>
      </template>
      <template #cell(category_id)="{ value }"> {{ getCategoryName(value) }} </template>
      <template #cell(sum)="{ item }"> {{ getTotalSum(item) }} </template>
      <template #row-details="{ item }">
        <b-table :fields="detailsFields" :items="item.items"></b-table>
      </template>
    </b-table>
    <grid-months></grid-months>
  </b-container>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import GridMonths from '@/components/GridMonths'

export default {
  components: {
    BTable,
    GridMonths
  },
  data() {
    return {
      records: [],
      groupFields: [
        { key: 'expand', label: '' },
        { key: 'category_id', label: 'Категория' },
        { key: 'sum', label: 'Сумма' }
      ],
      detailsFields: [
        { key: 'created_at', label: 'Дата' },
        { key: 'sum', label: 'Сумма' },
        { key: 'note', label: 'Комментарий' }
      ]
    }
  },
  async fetch() {
    await this.getRecords()
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    groupedRecords() {
      return Object.keys(this.records).map((key) => {
        return {
          category_id: key,
          items: this.records[key]
        }
      })
    }
  },
  methods: {
    async getRecords() {
      this.records = await this.$http.$get(`${process.env.API_URL}month/${this.$route.params.month}`)
    },
    getCategoryName(id) {
      const category = this.categories.find((category) => category.id.toString() === id.toString())
      return category ? category.name : null
    },
    getTotalSum(item) {
      return item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0)
    }
  }
}
</script>
