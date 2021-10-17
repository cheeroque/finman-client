<template>
  <main class="overflow-hidden">
    <ViewTabs :active="$route.query.show || null" :tabs="tabs" />

    <TableData
      :fields="fields"
      :items="items"
      :order="$route.query.order || orderDefault"
      :order-by="$route.query.orderBy || orderByDefault"
      class="mb-lg-32"
      @sort-changed="onSortChanged"
      @sort-reset="onSortReset"
    >
      <template #cell(created_at)="{ item }">
        <nuxt-link :to="`/month/${$monthApiLink(item.created_at)}`">
          <span class="date">
            {{ $dateWithFormat(item.created_at, { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
          </span>
          <span class="time">
            {{ $dateWithFormat(item.created_at, { timeStyle: 'short' }) }}
          </span>
        </nuxt-link>
      </template>
      <template #cell(sum)="{ item }">
        <span v-if="item.category.is_income && !$route.query.show" class="text-success">
          +&nbsp;{{ $sumWithFormat(item.sum) }}
        </span>
        <span v-else>{{ $sumWithFormat(item.sum) }}</span>
      </template>
      <template #cell(category_id)="{ item, value }">
        <nuxt-link :to="`/category/${value}`">
          {{ item.category.name }}
        </nuxt-link>
      </template>
      <template #cell(note)="{ item }">
        <a href="#" class="d-flex align-center" @click.prevent="$root.$emit('record-edit', item)">
          <span class="flex-fill">{{ item.note }}</span>
          <span class="d-flex flex-center align-self-start text-gray-300 ms-8">
            <svg-icon name="edit-24" width="24" height="24" aria-label="Редактировать" />
          </span>
        </a>
      </template>
    </TableData>

    <div class="d-lg-flex justify-lg-start px-16 px-lg-0">
      <PaginationNav
        v-if="records && records.data && records.data.length"
        :number-of-pages="records.last_page"
        :per-page="perPage"
        @per-page-changed="onPerPageChanged"
      />
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderByDefault: 'created_at',
      orderDefault: 'DESC',
      perPageDefault: 50,
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
          thClass: 'w-30 w-lg-40',
          tdClass: 'td-note text-gray-700'
        }
      ],
      tabs: [
        { value: null, text: 'Всё', icon: 'show-all-24' },
        { value: 'expense', text: 'Расходы', icon: 'show-expense-24' },
        { value: 'income', text: 'Доходы', icon: 'show-income-24' }
      ]
    }
  },
  async fetch() {
    await this.fetchRecords(this.$route.query)
  },
  computed: {
    ...mapGetters(['records']),
    items() {
      return this.records && this.records.data && this.records.data.length
        ? this.records.data.map((record) => {
            if (record.category && record.category.is_income && !this.$route.query.show) {
              record.rowVariant = 'success'
            }
            return record
          })
        : []
    },
    perPage() {
      return this.$route.query.perPage || this.perPageDefault
    }
  },
  watch: {
    '$route.query'() {
      this.$fetch()
    }
  },
  methods: {
    ...mapActions(['fetchRecords']),
    onPerPageChanged(event) {
      const query = { ...this.$route.query }
      if (!event || event === this.perPageDefault) {
        delete query.perPage
      } else {
        query.perPage = event
      }
      this.$router.push({ query })
    },
    onSortChanged({ orderBy, order }) {
      this.$router.push({
        query: { ...this.$route.query, orderBy, order }
      })
    },
    onSortReset() {
      const query = { ...this.$route.query }
      delete query.orderBy
      delete query.order
      this.$router.push({ query })
    }
  }
}
</script>
