<template>
  <main>
    <h2 class="page-header">
      <transition name="fade" mode="out-in">
        <span v-if="$fetchState.pending" :key="`pending-${$fetchState.pending}`" class="text-gray-200"> ... </span>
        <span v-else>
          {{ totalRows }} {{ getDeclension(totalRows, 'результат,результата,результатов') }} поиска по&nbsp;запросу
          <span class="fw-bold">{{ $route.query.q }}</span>
        </span>
      </transition>
    </h2>

    <TableData :fields="fields" :items="records" class="mb-lg-32">
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
        <span v-if="isIncome(item)" class="text-success"> +&nbsp;{{ $sumWithFormat(item.sum) }} </span>
        <span v-else>{{ $sumWithFormat(item.sum) }}</span>
      </template>
      <template #cell(category_id)="{ value }">
        <nuxt-link :to="`/category/${value}`">
          {{ categoryById(value).name }}
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
      <PaginationNav v-if="records && records.length" :per-page="perPage" :number-of-pages="totalPages" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        {
          key: 'created_at',
          label: 'Дата',
          thClass: 'w-20 w-lg-15',
          tdClass: 'td-datetime'
        },
        {
          key: 'sum',
          label: 'Сумма',
          thClass: 'w-20 w-lg-15',
          tdClass: 'td-sum'
        },
        {
          key: 'category_id',
          label: 'Категория',
          thClass: 'w-30'
        },
        {
          key: 'note',
          label: 'Комментарий',
          thClass: 'w-30 w-lg-40',
          tdClass: 'td-note text-gray-700'
        }
      ],
      records: [],
      totalPages: 0,
      totalRows: 0
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchCategories')

    const { data, last_page, total } = await this.$axios.$get(`/search`, { params: this.$route.query })

    this.records = data
    this.totalPages = last_page
    this.totalRows = total
  },
  computed: {
    ...mapGetters(['categoryById']),
    perPage() {
      return this.$route.query.perPage || 50
    }
  },
  watch: {
    '$route.query'() {
      this.$fetch()
    }
  },
  methods: {
    getDeclension(number, strings) {
      const cases = [2, 0, 1, 1, 1, 2]
      const titles = strings.split(',')

      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
    },
    isIncome(item) {
      const category = this.categoryById(item.category_id)
      return category.is_income
    }
  }
}
</script>
