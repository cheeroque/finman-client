<template>
  <main>
    <h2 class="page-header">
      Записи в&nbsp;категории <span class="fw-bold">{{ category.name }}</span>
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
                {{ $sumWithFormat(item.total) }}
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
        <PaginationNav
          v-if="numberOfPages"
          :number-of-pages="numberOfPages"
          :page-options="pageOptions"
          :per-page="perPage"
          class="mb-32"
          @per-page-changed="onPerPageChanged"
        />
      </div>
      <div class="col-12 col-lg-6 px-lg-32">
        <CategoryChart :chart-data="chartData" class="mt-16 mb-32" />
      </div>
    </div>
    <CategoryGrid />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      pageOptions: ['12', '18', '24', '30']
    }
  },
  async fetch() {
    await this.fetchRecordsByCategory({ categoryId: this.categoryId, params: this.$route.query })
  },
  computed: {
    ...mapGetters(['monthColors', 'recordsByCategory', 'error']),
    category() {
      return this.recordsByCategory && this.recordsByCategory.category
    },
    categoryId() {
      return this.$route.params.category
    },
    chartData() {
      return {
        labels: this.items.map(({ period }) => this.$dateWithFormat(period, { month: '2-digit', year: 'numeric' })),
        datasets: [
          {
            data: this.items.map(({ total }) => total),
            backgroundColor: this.items.map(({ period }) => {
              const date = new Date(period)
              const month = date.getUTCMonth()
              return this.monthColors[month]
            }),
            barPercentage: 1,
            categoryPercentage: 0.95
          }
        ]
      }
    },
    items() {
      return this.recordsByCategory && this.recordsByCategory.data
        ? Object.keys(this.recordsByCategory.data).map((key) => {
            return {
              period: key,
              items: this.recordsByCategory.data[key],
              total: this.getTotal(this.recordsByCategory.data[key], 'sum')
            }
          })
        : []
    },
    numberOfPages() {
      return this.recordsByCategory && this.recordsByCategory.total
        ? Math.ceil(this.recordsByCategory.total / this.perPage)
        : 0
    },
    perPage() {
      return this.$route.query.perPage || 18
    },
    query() {
      return { ...this.$route.query, perPage: this.perPage }
    }
  },
  watch: {
    '$route.query'() {
      this.$fetch()
    }
  },
  methods: {
    ...mapActions(['fetchRecordsByCategory']),
    getTotal(arr, field = 'total') {
      return arr.map((item) => item[field]).reduce((acc, cur) => acc + cur, 0)
    },
    onPerPageChanged(event) {
      this.$router.push({
        query: {
          ...this.$route.query,
          perPage: event
        }
      })
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
