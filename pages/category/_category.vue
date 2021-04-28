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
    <b-pagination v-model="page" :per-page="perPage" :total-rows="records.total"></b-pagination>
  </b-container>
</template>

<script>
import { BTable, BPagination } from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BPagination
  },
  data() {
    return {
      page: 1,
      perPage: 12,
      currentCategory: {},
      categories: [],
      records: {},
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
      return this.records.data
        ? Object.keys(this.records.data).map((key) => {
            return {
              period: key,
              items: this.records.data[key]
            }
          })
        : []
    }
  },
  watch: {
    page() {
      this.$fetch()
    }
  },
  methods: {
    getTotalSum(item) {
      // return item.items
      return item.items ? item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0) : 0
    }
  }
}
</script>
