<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <CardTabs :active="$route.query.show || null" :tabs="tabs">
      <TableCommon
        :fields="fields"
        :items="records && records.data"
        :order-by="$route.query.orderBy || orderByDefault"
        :order="$route.query.order || orderDefault"
        class="mb-lg-32"
        fixed
        responsive
        @sort-changed="onSortChanged"
        @sort-reset="onSortReset"
      >
        <template #cell(created_at)="{ item }">
          <b-link :to="`/month/${$monthApiLink(item.created_at)}`" class="text-reset">
            <span class="date">
              {{ $dateWithFormat(item.created_at, { day: '2-digit', month: '2-digit', year: '2-digit' }) }}
            </span>
            <span class="time">
              {{ $dateWithFormat(item.created_at, { timeStyle: 'short' }) }}
            </span>
          </b-link>
        </template>
        <template #cell(category_id)="{ value }">
          <b-link :to="`/category/${value}`" class="text-reset">
            {{ categoryById(value).name }}
          </b-link>
        </template>
        <template #cell(note)="{ item }">
          <b-link class="d-flex align-items-center text-reset" @click="editRecord(item)">
            <span class="flex-fill">{{ item.note }}</span>
            <span class="align-self-start text-gray-300">
              <svg-icon name="edit-16" width="16" height="16" aria-label="Редактировать" />
            </span>
          </b-link>
        </template>
      </TableCommon>
      <template #footer>
        <PaginationNav v-if="records && records.last_page" :number-of-pages="records.last_page" align="center" />
      </template>
    </CardTabs>
    <ModalRecordEdit v-model="modalShow" :item="activeRecord" @record-change="refresh" />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeRecord: null,
      orderByDefault: 'created_at',
      orderDefault: 'DESC',
      fields: [
        {
          key: 'created_at',
          label: 'Дата',
          sortable: true,
          thClass: 'sortable',
          tdClass: 'td-datetime'
        },
        {
          key: 'sum',
          label: 'Сумма',
          sortable: true,
          thClass: 'sortable text-right',
          tdClass: 'td-sum text-right'
        },
        {
          key: 'category_id',
          label: 'Категория',
          thClass: 'sortable',
          sortable: true
        },
        {
          key: 'note',
          label: 'Комментарий',
          thClass: null
        }
      ],
      modalShow: false,
      perPage: 50,
      tabs: [
        { value: null, text: 'Все записи' },
        { value: 'expense', text: 'Расходы' },
        { value: 'income', text: 'Доходы' }
      ]
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecords')
  },
  computed: {
    ...mapGetters(['categoryById', 'error']),
    categories() {
      return this.$store.state.categories
    },
    records() {
      return this.$store.state.records
    },
    query() {
      return { ...this.$route.query, perPage: this.perPage }
    }
  },
  watch: {
    '$route.query'() {
      this.refresh()
    }
  },
  methods: {
    editRecord(record) {
      this.activeRecord = record
      this.modalShow = true
    },
    onSortChanged({ orderBy, order }) {
      this.$router.push({
        query: { ...this.$route.query, orderBy, order }
      })
    },
    onSortReset() {
      this.$router.push({ query: null })
    },
    refresh() {
      this.$store.dispatch('fetchTotal')
      this.$store.dispatch('fetchRecords', this.query)
    }
  }
}
</script>
