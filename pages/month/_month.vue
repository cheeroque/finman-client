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
    <table class="table">
      <tbody>
        <tr v-for="year in [2016, 2017, 2018, 2019, 2020, 2021].reverse()" :key="year">
          <td v-for="month in 12" :key="`${year}-${13 - month}`">
            <b-link :to="`/month/${year}-${13 - month}`"> {{ year }}-{{ 13 - month }} </b-link>
          </td>
        </tr>
      </tbody>
    </table>
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
      categories: [],
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
    await this.getCategories()
    await this.getRecords()
  },
  computed: {
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
    async getCategories() {
      this.categories = await this.$http.$get(`${process.env.API_URL}/categories`)
    },
    async getRecords() {
      this.records = await this.$http.$get(`${process.env.API_URL}/month/${this.$route.params.month}`)
    },
    getCategoryName(id) {
      const category = this.categories.find((category) => category.id.toString() === id.toString())
      return category ? category.name : null
    },
    getTotalSum(item) {
      return item.items
        .map((item) => item.sum)
        .reduce((acc, item) => {
          console.log(acc, item)
          return acc + item
        }, 0)
    }
  }
}
</script>
