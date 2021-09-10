<template>
  <main>
    <h2 class="page-header">
      Записи в&nbsp;категории <span class="fw-bold">{{ categoryById(categoryId).name }}</span>
    </h2>
    <div class="row">
      <div class="col-12 col-lg-6">
        <TableData :fields="fields" :items="items" class="mb-lg-32">
          <template #cell(period)="{ value }">
            <span class="month-long" v-text="$dateWithFormat(value, { month: 'long' })"></span>
            <span class="month-numeric" v-text="`${$dateWithFormat(value, { month: '2-digit' })}.`"></span
            ><span class="year-numeric" v-text="$dateWithFormat(value, { year: 'numeric' })"></span>
          </template>
          <template #cell(sum)="{ detailsVisible, toggleDetails, item }">
            <div class="d-flex align-center position-relative">
              <a href="#" role="button" class="flex-fill text-decoration-dotted" @click="toggleDetails">
                {{ $sumWithFormat(getTotalSum(item)) }}
              </a>
              <button
                :class="{ open: detailsVisible }"
                :aria-label="detailsVisible ? 'Свернуть' : 'Развернуть'"
                class="btn btn-toggle-details ms-auto"
                @click="toggleDetails"
              >
                <svg-icon name="chevron-right-24" width="24" height="24" aria-hidden="true" />
              </button>
            </div>
          </template>
          <template #row-details="{ item }">
            <TableDetails :fields="detailFields" :items="item.items">
              <template #cell(created_at)="{ value }">
                <span class="date">
                  {{ $dateWithFormat(value, { day: '2-digit', month: '2-digit', year: '2-digit' }) }}
                </span>
                <span class="time">
                  {{ $dateWithFormat(value, { timeStyle: 'short' }) }}
                </span>
              </template>
              <template #cell(sum)="{ value }">
                {{ $sumWithFormat(value) }}
              </template>
            </TableDetails>
          </template>
        </TableData>
        <PaginationNav v-if="numberOfPages" :number-of-pages="numberOfPages" align="center" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        { key: 'period', label: 'Месяц', thClass: 'w-30', tdClass: 'td-period' },
        { key: 'sum', label: 'Сумма', tdClass: 'td-sum' }
      ],
      detailFields: [
        {
          key: 'created_at',
          label: 'Дата',
          tdClass: 'td-datetime w-30'
        },
        {
          key: 'sum',
          label: 'Сумма',
          tdClass: 'td-sum w-20'
        },
        {
          key: 'note',
          label: 'Комментарий',
          tdClass: 'td-note text-gray-700'
        }
      ],
      locale: 'ru-RU',
      perPage: 18
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecordsByCategory', { categoryId: this.categoryId })
  },
  computed: {
    ...mapGetters(['categoryById', 'error']),
    categories() {
      return this.$store.state.categories
    },
    categoryId() {
      return this.$route.params.category
    },
    records() {
      return this.$store.state.recordsByCategory
    },
    items() {
      return this.records.data
        ? Object.keys(this.records.data).map((key) => {
            return {
              period: key,
              items: this.records.data[key]
            }
          })
        : []
    },
    numberOfPages() {
      return this.records && this.records.total ? Math.ceil(this.records.total / this.perPage) : 0
    },
    query() {
      return { ...this.$route.query, perPage: this.perPage }
    }
  },
  watch: {
    '$route.query'() {
      this.$store.dispatch('fetchRecordsByCategory', { categoryId: this.categoryId, params: this.query })
    }
  },
  methods: {
    getTotalSum(item) {
      return item.items ? item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0) : 0
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 991.98px) {
  /deep/ {
    .td-period {
      .month-long {
        display: none;
      }
    }
  }
}

@media (min-width: 992px) {
  /deep/ {
    .td-period {
      .month-long {
        text-transform: capitalize;
      }

      .month-numeric {
        display: none;
      }
    }
  }
}
</style>
