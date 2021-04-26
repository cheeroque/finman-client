<template>
  <b-container tag="main">
    <b-nav>
      <b-nav-item :active="show === 'expense'" @click="show = 'expense'"> Расходы </b-nav-item>
      <b-nav-item :active="show === 'income'" @click="show = 'income'"> Доходы </b-nav-item>
      <b-nav-item :active="!show" @click="show = null"> Всё сразу </b-nav-item>
      <b-nav-item class="ml-auto" @click="modalShow = true"> Добавить </b-nav-item>
    </b-nav>
    <transition name="fade" mode="out-in">
      <b-table :key="page" :fields="fields" :items="records.data" @sort-changed="onTableSort">
        <template #cell(created_at)="{ item }">
          <b-link :to="`/month/${getMonth(item)}`">
            {{ formatDate(item) }}
            <!-- {{ item.updated_at ? formatDate(item.updated_at) : formatDate(item.created_at) }} -->
          </b-link>
        </template>
        <template #cell(category_id)="{ value }">
          {{ getCategoryName(value) }}
        </template>
        <template #cell(edit)="{ toggleDetails }">
          <b-link @click="toggleDetails"> edit </b-link>
        </template>
        <template #row-details="{ item, toggleDetails }">
          <form-record-edit
            :record="item"
            :categories="categories"
            @change="
              toggleDetails
              reFetch(true)
            "
          ></form-record-edit>
        </template>
      </b-table>
    </transition>
    <b-pagination v-model="page" :per-page="perPage" :total-rows="records.total"></b-pagination>
    <modal-record-create v-model="modalShow" :categories="categories" @hide="reFetch(true)"></modal-record-create>
  </b-container>
</template>

<script>
import { BNav, BNavItem, BTable, BPagination } from 'bootstrap-vue'
import FormRecordEdit from '@/components/FormRecordEdit'
import ModalRecordCreate from '@/components/ModalRecordCreate'

export default {
  components: {
    BNav,
    BNavItem,
    BTable,
    BPagination,
    FormRecordEdit,
    ModalRecordCreate
  },
  data() {
    return {
      records: [],
      categories: [],
      page: 1,
      perPage: 50,
      sortBy: 'created_at',
      sortDesc: true,
      show: null,
      modalShow: false,
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
    await this.reFetch()
  },
  computed: {
    query() {
      const query = {
        page: this.page,
        perPage: this.perPage,
        orderBy: this.sortBy,
        order: this.sortDesc ? 'DESC' : 'ASC',
        show: this.show
      }
      return Object.keys(query)
        .filter((key) => Boolean(query[key]))
        .map((key) => `${key}=${query[key]}`)
        .join('&')
    }
  },
  watch: {
    page() {
      this.$fetch()
    },
    show() {
      this.$fetch()
    }
  },
  methods: {
    async getRecords() {
      this.records = await this.$http.$get(`${process.env.API_URL}/records?${this.query}`)
    },
    async getCategories() {
      this.categories = await this.$http.$get(`${process.env.API_URL}/categories`)
    },
    async reFetch(refreshTotal = false) {
      await this.getRecords()
      if (!(this.categories && this.categories.length)) await this.getCategories()
      if (refreshTotal) this.$root.$emit('refetch')
    },
    onTableSort(event) {
      this.sortBy = event.sortBy
      this.sortDesc = event.sortDesc
      this.$fetch()
    },
    getCategoryName(id) {
      const category = this.categories.find((category) => category.id.toString() === id.toString())
      return category ? category.name : null
    },
    getMonth(item) {
      const dateString = item.updated_at || item.created_at
      const date = new Date(dateString)

      return `${date.getFullYear()}-${date.getMonth() + 1}`
    },
    formatDate(item) {
      const dateString = item.updated_at || item.created_at
      const date = new Date(dateString)
      const dateOptions = {
        dateStyle: 'short',
        timeStyle: 'short'
      }
      return date.toLocaleString('ru-RU', dateOptions)
    }
  }
}
</script>
