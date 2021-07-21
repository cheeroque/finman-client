<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <h3 class="mb-32">Записи в&nbsp;категории &laquo;{{ categoryById(categoryId).name }}&raquo;</h3>
    <b-row>
      <b-col lg="6">
        <TableCommon :fields="fields" :items="items" class="mb-lg-32" details-td-class="table-details-wrapper" fixed>
          <template #cell(period)="{ value }">
            <div class="d-flex align-items-center">
              {{ formatPeriod(value) }}
            </div>
          </template>
          <template #cell(sum)="{ detailsShowing, toggleDetails, item }">
            <div class="d-flex align-items-center">
              {{ getTotalSum(item) }}&nbsp;₽
              <b-button
                :class="{ open: detailsShowing }"
                variant="link"
                class="table-details-toggle ml-auto"
                @click="toggleDetails"
              >
                <span class="sr-only" v-text="detailsShowing ? 'Свернуть' : 'Развернуть'"></span>
              </b-button>
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
            </TableDetails>
          </template>
        </TableCommon>
        <PaginationNav v-if="numberOfPages" :number-of-pages="numberOfPages" align="center" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        { key: 'period', label: 'Месяц', thClass: 'th-period', tdClass: 'td-period' },
        { key: 'sum', label: 'Сумма', thClass: 'th-sum', tdClass: 'td-sum' }
      ],
      detailFields: [
        {
          key: 'created_at',
          label: 'Дата',
          thClass: 'th-details-datetime',
          tdClass: 'td-datetime td-details-datetime'
        },
        {
          key: 'sum',
          label: 'Сумма',
          thClass: 'th-details-sum',
          tdClass: 'td-sum td-details-sum',
          formatter: (value) => `${value}\xA0₽`
        },
        {
          key: 'note',
          label: 'Комментарий',
          thClass: 'th-details-note',
          tdClass: 'td-details-note'
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
        ? Object.keys(this.records.data).map((key, index) => {
            return {
              period: key,
              items: this.records.data[key]
              // _showDetails: index === 0
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
    formatPeriod(period) {
      const date = new Date(period)
      if (this.$isValidDate(date)) {
        const year = date.toLocaleDateString(this.locale, { year: 'numeric' })
        const month = date.toLocaleDateString(this.locale, { month: 'long' })

        return `${month} ${year}`
      } else return period
    },
    getTotalSum(item) {
      return item.items ? item.items.map((item) => item.sum).reduce((acc, item) => acc + item, 0) : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content::v-deep {
  .table {
    th {
      &.th-period {
        width: 25%;
      }

      &.th-sum {
        width: 75%;
      }
    }

    td {
      vertical-align: middle;

      &.td-period {
        text-transform: capitalize;
      }

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
