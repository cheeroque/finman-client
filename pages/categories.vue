<template>
  <main>
    <h2 class="page-header">Категории</h2>
    <TableData
      :fields="fields"
      :fixed="false"
      :items="sortedCategories"
      :order="order"
      :order-by="orderBy"
      @sort-changed="onSortChanged"
      @sort-reset="onSortReset"
    >
      <template #cell(name)="{ item, value }">
        <nuxt-link :to="`/category/${item.id}`">
          {{ value }}
        </nuxt-link>
      </template>
      <template #cell(slug)="{ value }">
        <code class="text-gray-600">{{ value }}</code>
      </template>
      <template #cell(is_income)="{ value }">
        <div v-if="value" class="d-inline-flex">
          <span class="category-is-income">
            <svg-icon name="check-16" width="16" height="16" aria-label="Доход" />
          </span>
        </div>
        <span v-else></span>
      </template>
      <template #cell(color)="{ value }">
        <span :style="{ backgroundColor: value }" class="category-color"></span>
      </template>
      <template #cell(edit)="{ item }">
        <div class="d-flex">
          <button class="btn btn-link text-gray-300" @click.prevent="showModal(item)">
            <svg-icon name="edit-24" width="24" height="24" aria-label="Редактировать" />
          </button>
        </div>
      </template>
    </TableData>
    <ModalCategoryEdit v-model="modalVisible" :create="isCreate" :item="activeCategory" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeCategory: {},
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Имя', sortable: true },
        {
          key: 'slug',
          label: 'Слаг',
          thClass: 'd-none d-lg-table-cell',
          tdClass: 'd-none d-lg-table-cell',
          sortable: true
        },
        {
          key: 'is_income',
          label: 'Доход',
          thClass: 'd-none d-lg-table-cell text-center',
          tdClass: 'd-none d-lg-table-cell text-center lh-0',
          sortable: true
        },
        {
          key: 'color',
          label: 'Цвет',
          thClass: 'd-none d-lg-table-cell text-center',
          tdClass: 'd-none d-lg-table-cell text-center lh-0'
        },
        { key: 'edit', label: null, thClass: 'w-0' }
      ],
      isCreate: false,
      modalVisible: false,
      order: 'ASC',
      orderBy: 'id'
    }
  },
  async fetch() {
    await this.fetchCategories()
  },
  computed: {
    ...mapGetters(['categories']),
    sortedCategories() {
      const categories = this.categories ? JSON.parse(JSON.stringify(this.categories)) : []
      return categories.sort((a, b) => {
        return this.order === 'ASC' ? a[this.orderBy] > b[this.orderBy] : b[this.orderBy] > a[this.orderBy]
      })
    }
  },
  created() {
    this.$root.$on('category-add', () => {
      this.showModal()
    })
  },
  methods: {
    ...mapActions(['fetchCategories']),
    onSortChanged({ orderBy, order }) {
      this.orderBy = orderBy
      this.order = order
    },
    onSortReset() {
      this.orderBy = 'id'
      this.order = 'ASC'
    },
    showModal(category) {
      if (category) {
        this.isCreate = false
        this.activeCategory = category
      } else {
        this.isCreate = true
        this.activeCategory = {}
      }
      this.modalVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.category-is-income {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 99rem;
  color: $white;
  background-color: $success;
}

.category-color {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 99rem;
}
</style>
