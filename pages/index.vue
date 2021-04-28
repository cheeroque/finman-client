<template>
  <b-container tag="main">
    <b-row class="mb-32">
      <b-col cols="auto" class="flex-fill">
        <nav-show-mode v-model="show" @input="$fetch"></nav-show-mode>
      </b-col>
      <b-col cols="auto">
        <b-button block @click="modalShow = true"> Добавить </b-button>
      </b-col>
    </b-row>
    <transition name="fade" mode="out-in">
      <b-table :key="page" :fields="fields" :items="records.data" @sort-changed="onTableSort">
        <template #cell(created_at)="{ item }">
          <b-link :to="`/month/${$getPeriod(item.created_at)}`">
            {{ formatDate(item) }}
          </b-link>
        </template>
        <template #cell(category_id)="{ value }">
          <b-link :to="`/category/${value}`">
            {{ getCategoryName(value) }}
          </b-link>
        </template>
        <template #cell(edit)="{ toggleDetails }">
          <b-link @click="toggleDetails"> edit </b-link>
        </template>
        <template #row-details="{ item, toggleDetails }">
          <form-record-edit
            :record="item"
            @change="
              () => {
                toggleDetails()
                refresh()
              }
            "
          ></form-record-edit>
        </template>
      </b-table>
    </transition>
    <b-pagination v-model="page" :per-page="perPage" :total-rows="records.total" @input="$fetch"></b-pagination>
    <modal-record-create v-model="modalShow" @hide="refresh"></modal-record-create>
  </b-container>
</template>

<script>
import { BTable, BPagination } from 'bootstrap-vue'
import NavShowMode from '@/components/NavShowMode'
import FormRecordEdit from '@/components/FormRecordEdit'
import ModalRecordCreate from '@/components/ModalRecordCreate'

export default {
  components: {
    BTable,
    BPagination,
    NavShowMode,
    FormRecordEdit,
    ModalRecordCreate
  },
  data() {
    return {
      records: [],
      page: 1,
      perPage: 50,
      sortBy: 'created_at',
      sortDesc: true,
      show: 'expense',
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
    await this.getRecords()
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
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
  methods: {
    async getRecords() {
      this.records = await this.$http.$get(`${process.env.API_URL}/records?${this.query}`)
    },
    onTableSort(event) {
      this.sortBy = event.sortBy
      this.sortDesc = event.sortDesc
      this.$fetch()
    },
    getCategory(id) {
      return this.categories.find((category) => category.id.toString() === id.toString())
    },
    getCategorySlug(id) {
      const category = this.getCategory(id)
      return category ? category.slug : null
    },
    getCategoryName(id) {
      const category = this.getCategory(id)
      return category ? category.name : null
    },
    // getMonth(item) {
    //   const dateString = item.updated_at || item.created_at
    //   const date = new Date(dateString)

    //   return `${date.getFullYear()}-${date.getMonth() + 1}`
    // },
    formatDate(item) {
      const dateString = item.created_at
      const date = new Date(dateString)
      const dateOptions = {
        dateStyle: 'short',
        timeStyle: 'short'
      }
      return date.toLocaleString('ru-RU', dateOptions)
    },
    refresh() {
      this.$store.dispatch('getTotal')
      this.$fetch()
    }
  }
}
</script>
