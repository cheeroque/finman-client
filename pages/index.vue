<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <transition name="fade" mode="out-in">
      <table-card
        :key="page"
        :fields="fields"
        :items="records.data"
        :current-page="page"
        :per-page="perPage"
        :total="records.total"
        @sort-changed="changeSort"
        @page-changed="changePage"
      >
        <template #cell(created_at)="{ item }">
          <b-link :to="`/month/${$getPeriod(item.created_at)}`" class="text-reset">
            <span class="date">{{ formatDate(item) }}</span>
            <span class="time">{{ formatTime(item) }}</span>
          </b-link>
        </template>
        <template #cell(category_id)="{ value }">
          <b-link :to="`/category/${value}`" class="text-reset">
            {{ getCategoryName(value) }}
          </b-link>
        </template>
        <template #cell(note)="{ value, toggleDetails }">
          <b-link class="text-reset row-details-toggle" @click="toggleDetails">
            <span class="caption">{{ value }}</span>
            <svg-icon name="edit-16" width="16" height="16" aria-label="Редактировать" />
          </b-link>
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
      </table-card>
    </transition>
    <b-pagination v-model="page" :per-page="perPage" :total-rows="records.total" @input="$fetch"></b-pagination>
    <modal-record-create v-model="modalShow" @hide="refresh"></modal-record-create>
    <app-navbar v-model="show" @change="$fetch" @create-record="modalShow = true" />
  </b-container>
</template>

<script>
import { BPagination } from 'bootstrap-vue'
import TableCard from '@/components/TableCard'
import AppNavbar from '@/components/AppNavbar'
import FormRecordEdit from '@/components/FormRecordEdit'
import ModalRecordCreate from '@/components/ModalRecordCreate'

export default {
  components: {
    TableCard,
    BPagination,
    AppNavbar,
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
        { key: 'created_at', label: 'Дата', sortable: true, tdClass: 'table-cell-datetime' },
        { key: 'sum', label: 'Сумма', sortable: true, tdClass: 'table-cell-sum' },
        { key: 'category_id', label: 'Категория', sortable: true },
        { key: 'note', label: 'Комментарий' }
      ]
    }
  },
  async fetch() {
    await this.getRecords()
  },
  head: {
    bodyAttrs: {
      class: 'has-navbar'
    }
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
      this.records = await this.$axios.$get(`records?${this.query}`)
    },
    changeSort(event) {
      this.sortBy = event.sortBy
      this.sortDesc = event.sortDesc
      this.$fetch()
    },
    changePage(event) {
      this.page = event
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
    formatDate(item) {
      const dateString = item.created_at
      const date = new Date(dateString)
      const dateOptions = {
        day: '2-digit',
        month: '2-digit'
      }
      return date.toLocaleString('ru-RU', dateOptions)
    },
    formatTime(item) {
      const dateString = item.created_at
      const date = new Date(dateString)
      const dateOptions = {
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
