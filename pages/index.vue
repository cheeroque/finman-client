<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <CardTabs :value="show" :tabs="tabs">
      <DataTable :fields="fields" :items="records.data" class="mb-lg-32" @sort-changed="onSortChanged">
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
        <template #cell(note)="{ item }">
          <b-link class="text-reset row-details-toggle" @click="editRecord(item)">
            <span class="caption">{{ item.note }}</span>
            <svg-icon name="edit-16" width="16" height="16" aria-label="Редактировать" />
          </b-link>
        </template>
      </DataTable>
      <template #footer>
        <PaginationNav align="center" :number-of-pages="Math.ceil(records.total / perPage)" />
      </template>
    </CardTabs>
    <ModalRecordEdit v-model="modalShow" :item="activeRecord" @hide="refresh" />
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      activeRecord: null,
      records: [],
      perPage: 50,
      modalShow: false,
      fields: [
        {
          key: 'created_at',
          label: 'Дата',
          sortable: true,
          thClass: null,
          tdClass: 'table-cell-datetime'
        },
        {
          key: 'sum',
          label: 'Сумма',
          sortable: true,
          thClass: 'text-right',
          tdClass: 'table-cell-sum text-right'
        },
        {
          key: 'category_id',
          label: 'Категория',
          thClass: null,
          sortable: true
        },
        {
          key: 'note',
          label: 'Комментарий',
          thClass: null
        }
      ],
      tabs: [
        { value: null, text: 'Все записи' },
        { value: 'expense', text: 'Расходы' },
        { value: 'income', text: 'Доходы' }
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
      const query = { ...this.$route.query, perPage: this.perPage }
      return Object.keys(query)
        .filter((key) => Boolean(query[key]))
        .map((key) => `${key}=${query[key]}`)
        .join('&')
    },
    show() {
      return this.$route.query.show || null
    }
  },
  watch: {
    '$route.query'() {
      this.refresh()
      if (process.client) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  },
  methods: {
    async getRecords() {
      this.records = await this.$axios.$get(`records?${this.query}`)
    },
    editRecord(record) {
      this.activeRecord = record
      this.modalShow = true
    },
    onSortChanged({ sortBy, sortDesc }) {
      this.$router.push({
        query: { ...this.$route.query, orderBy: sortBy || 'created_at', order: sortDesc ? 'DESC' : 'ASC' }
      })
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
