<template>
  <main class="overflow-hidden">
    <ViewTabs :active="$route.query.show || null" :tabs="tabs" />
    <TableData
      :fields="fields"
      :items="records && records.data"
      :order="$route.query.order || orderDefault"
      :order-by="$route.query.orderBy || orderByDefault"
      @sort-changed="onSortChanged"
      @sort-reset="onSortReset"
    >
      <template #cell(created_at)="{ item }">
        <nuxt-link :to="`/month/${$monthApiLink(item.created_at)}`" class="text-reset">
          <span class="date">
            {{ $dateWithFormat(item.created_at, { day: '2-digit', month: '2-digit', year: '2-digit' }) }}
          </span>
          <span class="time">
            {{ $dateWithFormat(item.created_at, { timeStyle: 'short' }) }}
          </span>
        </nuxt-link>
      </template>
      <template #cell(category_id)="{ value }">
        <nuxt-link :to="`/category/${value}`" class="text-reset">
          {{ categoryById(value).name }}
        </nuxt-link>
      </template>
      <template #cell(note)="{ item }">
        <a href="#" class="d-flex align-center text-reset" @click.prevent="$root.$emit('edit-record', item)">
          <span class="flex-fill">{{ item.note }}</span>
          <span class="d-flex flex-center align-self-start text-gray-300 ms-8">
            <svg-icon name="edit-24" width="24" height="24" aria-label="Редактировать" />
          </span>
        </a>
      </template>
    </TableData>
    <!-- <CardTabs :active="$route.query.show || null" :tabs="tabs">
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
    </CardTabs> -->
    <!-- <ModalRecordEdit v-model="modalShow" :item="activeRecord" @record-change="refresh" /> -->
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderByDefault: 'created_at',
      orderDefault: 'DESC',
      fields: [
        {
          key: 'created_at',
          label: 'Дата',
          sortable: true,
          thClass: 'w-20 w-lg-15',
          tdClass: 'td-datetime'
        },
        {
          key: 'sum',
          label: 'Сумма',
          sortable: true,
          thClass: 'w-20 w-lg-15',
          tdClass: 'td-sum'
        },
        {
          key: 'category_id',
          label: 'Категория',
          thClass: 'w-30',
          sortable: true
        },
        {
          key: 'note',
          label: 'Комментарий',
          thClass: 'w-30 w-lg-40'
        }
      ],
      perPage: 50,
      tabs: [
        { value: null, text: 'Всё', icon: 'show-all-24' },
        { value: 'expense', text: 'Расходы', icon: 'show-expense-24' },
        { value: 'income', text: 'Доходы', icon: 'show-income-24' }
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
