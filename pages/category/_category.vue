<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <h3 class="mb-32">Записи в&nbsp;категории &laquo;{{ categoryById(categoryId).name }}&raquo;</h3>
    <b-row>
      <b-col lg="6">
        <DataTable :fields="groupFields" :items="groupedRecords" class="mb-lg-32">
          <template #cell(expand)="{ toggleDetails }">
            <b-link @click="toggleDetails"> + </b-link>
          </template>
          <template #cell(sum)="{ item }"> {{ getTotalSum(item) }} </template>
          <template #row-details="{ item }">
            <b-table-lite :fields="detailsFields" :items="item.items" borderless striped></b-table-lite>
          </template>
        </DataTable>
        <PaginationNav v-if="numberOfPages" :number-of-pages="numberOfPages" align="center" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { BTableLite } from 'bootstrap-vue'

export default {
  components: {
    BTableLite
  },
  data() {
    return {
      perPage: 18,
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
    await this.$store.dispatch('fetchRecordsByCategory', { categoryId: this.categoryId })
  },
  computed: {
    ...mapGetters(['categoryById', 'error']),
    categories() {
      return this.$store.state.categories
    },
    categoryId() {
      return this.$route.params.category
    },
    records() {
      return this.$store.state.recordsByCategory
    },
    groupedRecords() {
      return this.records.data
        ? Object.keys(this.records.data).map((key) => {
            return {
              period: key,
              items: this.records.data[key]
            }
          })
        : []
    },
    numberOfPages() {
      return this.records && this.records.total ? Math.ceil(this.records.total / this.perPage) : 0
    },
    query() {
      return { ...this.$route.query, perPage: this.perPage }
    }
  },
  watch: {
    '$route.query'() {
      this.$store.dispatch('fetchRecordsByCategory', { categoryId: this.categoryId, params: this.query })
    }
  },
  methods: {
    getTotalSum(item) {
      return item.items ? item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0) : 0
    }
  }
}
</script>
