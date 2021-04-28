<template>
  <b-container tag="main">
    <b-table :fields="groupFields" :items="groupedRecords">
      <template #cell(expand)="{ toggleDetails }">
        <b-link @click="toggleDetails"> + </b-link>
      </template>
      <template #cell(sum)="{ item }"> {{ getTotalSum(item) }} </template>
      <template #row-details="{ item }">
        <b-table :fields="detailsFields" :items="item.items"></b-table>
      </template>
    </b-table>
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
      page: 1,
      perPage: 12,
      currentCategory: {},
      categories: [],
      records: [],
      groupFields: [
        { key: 'expand', label: '' },
        { key: 'period', label: 'Месяц' },
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
    this.categories = await this.$http.$get(`${process.env.API_URL}/categories`)
    this.currentCategory = await this.$http.$get(`${process.env.API_URL}/categories/${this.$route.params.category}`)
    this.records = await this.$http.$get(
      `${process.env.API_URL}/category/${this.$route.params.category}?page=${this.page}&perPage=${this.perPage}`
    )
  },
  computed: {
    groupedRecords() {
      return Object.keys(this.records).map((key) => {
        return {
          period: key,
          items: this.records[key]
        }
      })
    }
  },
  methods: {
    getTotalSum(item) {
      return item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0)
    }
  }
}
</script>
