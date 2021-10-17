<template>
  <main>
    <h2 class="page-header">
      Записи за&nbsp;<span class="fw-bold">{{ periodName }}</span>
    </h2>
    <div class="row">
      <div class="col-12 col-lg-6">
        <TableData :fields="fields" :items="tableItems" class="mb-lg-32">
          <template #cell(category_id)="{ item, value }">
            <template v-if="value">
              {{ item.category && item.category.name }}
            </template>
            <template v-else>
              {{ item.text }}
            </template>
          </template>
          <template #cell(sum)="{ detailsVisible, toggleDetails, item }">
            <div v-if="item.category_id" class="d-flex align-center position-relative">
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
            <span v-else>{{ $sumWithFormat(item.total) }}</span>
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
import { mapActions, mapGetters } from 'vuex'

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
    await this.fetchRecordsByPeriod({ period: this.period })
  },
  computed: {
    ...mapGetters(['categories', 'recordsByPeriod', 'error']),
    chartData() {
      return {
        labels: this.expenses.map(({ category }) => {
          return category && category.name
        }),
        datasets: [
          {
            data: this.expenses.map(({ total }) => total),
            backgroundColor: this.expenses.map(({ category }) => {
              return category && category.color
            })
          }
        ]
      }
    },
    expenses() {
      return this.items
        .filter(({ category }) => !(category && category.is_income))
        .map((item) => {
          return {
            ...item,
            total: this.getTotal(item.items, 'sum')
          }
        })
        .sort((a, b) => b.total - a.total)
    },
    incomes() {
      return this.items
        .filter(({ category }) => category && category.is_income)
        .map((item) => {
          return {
            ...item,
            total: this.getTotal(item.items, 'sum')
          }
        })
        .sort((a, b) => b.total - a.total)
    },
    items() {
      return Object.keys(this.recordsByPeriod).map((key) => {
        return {
          category_id: key,
          category: this.recordsByPeriod[key][0].category,
          items: this.recordsByPeriod[key]
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
    tableItems() {
      const items = []
      const incomesTotal = this.getTotal(this.incomes)
      const expensesTotal = this.getTotal(this.expenses)
      const balance = incomesTotal - expensesTotal

      if (this.expenses) {
        items.push(...this.expenses)
      }
      if (this.incomes) {
        items.push(...this.incomes)
      }
      if (this.expenses && this.expenses.length > 1) {
        items.push({
          text: 'Всего расходов',
          total: expensesTotal,
          rowVariant: 'danger',
          cellClass: {
            category_id: 'fw-medium'
          }
        })
      }
      if (this.incomes && this.incomes.length > 1) {
        items.push({
          text: 'Всего доходов',
          total: incomesTotal,
          rowVariant: 'success',
          cellClass: {
            category_id: 'fw-medium'
          }
        })
      }
      items.push({
        text: 'Итого:',
        total: balance,
        rowVariant: `${balance > 0 ? 'success' : 'danger'} table-row-total`
      })
      return items
    }
  },
  methods: {
    ...mapActions(['fetchRecordsByPeriod']),
    getTotal(arr, field = 'total') {
      return arr.map((item) => item[field]).reduce((acc, cur) => acc + cur, 0)
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
