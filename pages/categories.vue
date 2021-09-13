<template>
  <main>
    <h2 class="page-header">Категории</h2>
    <TableData
      :fields="fields"
      :fixed="false"
      :items="sortedItems"
      :order="order"
      :order-by="orderBy"
      @sort-changed="onSortChanged"
      @sort-reset="onSortReset"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Имя', sortable: true },
        { key: 'slug', label: 'Слаг', sortable: true },
        { key: 'is_income', label: 'Доход', sortable: true },
        { key: 'color', label: 'Цвет' }
      ],
      order: 'ASC',
      orderBy: 'id'
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchCategories')
  },
  computed: {
    ...mapGetters(['categories']),
    sortedItems() {
      const categories = [...this.categories]
      return categories.sort((a, b) => {
        return this.order === 'ASC' ? a[this.orderBy] > b[this.orderBy] : b[this.orderBy] > a[this.orderBy]
      })
    }
  },
  methods: {
    onSortChanged({ orderBy, order }) {
      this.orderBy = orderBy
      this.order = order
    },
    onSortReset() {
      this.orderBy = 'id'
      this.order = 'ASC'
    }
  }
}
</script>
