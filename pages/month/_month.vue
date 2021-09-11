<template>
  <main>
    <h2 class="page-header">
      Записи за&nbsp;<span class="fw-bold">{{ periodName }}</span>
    </h2>
    <div class="row">
      <div class="col-12 col-lg-6">
        <TableData :fields="fields" :items="items" class="mb-lg-32">
          <template #cell(category_id)="{ value }"> {{ categoryById(value).name }} </template>
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
      </div>
      <div class="col-12 col-lg-6 px-lg-32">
        <MonthChart :chart-data="chartData" class="mt-16 mb-32" />
      </div>
    </div>
    <MonthGrid />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        { key: 'category_id', label: 'Категория', thClass: 'w-30' },
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
      locale: 'ru-RU'
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecordsByPeriod', { period: this.period })
  },
  computed: {
    ...mapGetters(['categoryById', 'error']),
    categories() {
      return this.$store.state.categories
    },
    chartData() {
      const itemCategoryIds = this.items.map(({ category_id }) => category_id)
      return {
        labels: this.categories.filter(({ id }) => itemCategoryIds.includes(id.toString())).map(({ name }) => name),
        datasets: [
          {
            data: this.items.map(({ items }) => items.map(({ sum }) => sum).reduce((acc, cur) => acc + cur, 0)),
            backgroundColor: this.items.map(({ category_id }, index) => {
              const step = Math.floor(360 / (this.items.length || 1))
              return `hsl(${step * index}, 100%, 50%)`
              // return `var(--category-bg-${category_id})`
            })
          }
        ]
      }
    },
    items() {
      return Object.keys(this.records).map((key) => {
        return {
          category_id: key,
          items: this.records[key]
        }
      })
    },
    period() {
      return this.$route.params.month
    },
    periodName() {
      const date = new Date(this.period)
      if (this.$isValidDate(date)) {
        const year = date.toLocaleDateString(this.locale, { year: 'numeric' })
        const month = date.toLocaleDateString(this.locale, { month: 'long' })

        return `${month} ${year}`
      } else return this.period
    },
    records() {
      return this.$store.state.recordsByPeriod
    }
  },
  watch: {
    '$route.query'() {
      this.$store.dispatch('fetchRecordsByPeriod', { period: this.period })
    }
  },
  methods: {
    getTotalSum(item) {
      return item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content::v-deep {
  .table {
    th {
      &.th-category {
        width: 25%;
      }

      &.th-sum {
        width: 75%;
      }
    }

    td {
      vertical-align: middle;

      &.td-details-datetime {
        width: 25%;
      }

      &.td-details-sum {
        width: 20%;
      }
    }
  }
}
</style>
