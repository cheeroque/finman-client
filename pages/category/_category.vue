<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <h3 class="mb-32">Записи в&nbsp;категории &laquo;{{ categoryById(categoryId).name }}&raquo;</h3>
    <b-row>
      <b-col lg="6">
        <DataTable
          :fields="groupFields"
          :items="groupedRecords"
          details-td-class="border-bottom bg-white p-0"
          class="mb-lg-32"
          fixed
        >
          <template #cell(period)="{ detailsShowing, toggleDetails, value }">
            <div class="d-flex align-items-center">
              <b-button :class="{ open: detailsShowing }" variant="link" class="details-toggle" @click="toggleDetails">
                <span class="sr-only" v-text="detailsShowing ? 'Свернуть' : 'Развернуть'"></span>
              </b-button>
              {{ formatPeriod(value) }}
            </div>
          </template>
          <template #cell(sum)="{ item }"> {{ getTotalSum(item) }}&nbsp;₽ </template>
          <template #row-details="{ item }">
            <b-table-lite
              :fields="detailsFields"
              :items="item.items"
              thead-class="d-none"
              class="mb-0"
              borderless
              fixed
              striped
            >
              <template #cell(created_at)="{ value }">
                <span class="date">
                  {{ $dateWithFormat(value, { day: '2-digit', month: '2-digit', year: '2-digit' }) }}
                </span>
                <span class="time">
                  {{ $dateWithFormat(value, { timeStyle: 'short' }) }}
                </span>
              </template>
            </b-table-lite>
          </template>
        </DataTable>
        <PaginationNav v-if="numberOfPages" :number-of-pages="numberOfPages" align="center" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { BTableLite } from 'bootstrap-vue'

export default {
  components: {
    BTableLite
  },
  data() {
    return {
      detailsFields: [
        { key: 'created_at', label: 'Дата', tdClass: 'td-datetime td-details-period' },
        { key: 'sum', label: 'Сумма', tdClass: 'td-details-sum', formatter: (value) => `${value}\xA0₽` },
        { key: 'note', label: 'Комментарий', tdClass: 'td-details-note' }
      ],
      groupFields: [
        { key: 'period', label: 'Месяц', thClass: 'th-period', tdClass: 'td-period' },
        { key: 'sum', label: 'Сумма', thClass: 'th-sum', tdClass: 'td-sum' }
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
    groupedRecords() {
      return this.records.data
        ? Object.keys(this.records.data).map((key, index) => {
            return {
              period: key,
              items: this.records.data[key],
              _showDetails: index === 0
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
    td {
      vertical-align: middle;

      &.td-period {
        text-transform: capitalize;
      }
    }
  }

  .details-toggle {
    position: relative;
    width: 1.75rem;
    height: 1.75rem;
    margin-left: -0.5rem;
    margin-right: 0.75rem;
    padding: 0;
    text-decoration: none;
    border: none;
    border-radius: $rounded-pill;
    color: $gray-500;

    &::before,
    &::after {
      display: block;
      content: '';
      position: absolute;
      left: calc(50% - 0.5rem);
      top: calc(50% - 1px);
      width: 1rem;
      height: 2px;
      background-color: currentColor;
      transition: $transition-base;
    }

    &::after {
      transform: rotate(-90deg);
    }

    &.open {
      color: $primary;

      &::before {
        transform: rotate(180deg);
      }

      &::after {
        transform: rotate(0);
      }
    }

    &:focus,
    &.focus {
      background-color: rgba($primary, 0.05);
      box-shadow: none;
    }
  }
}
</style>
