<template>
  <b-container tag="main" class="px-0 px-lg-24" fluid>
    <h3 class="mb-32">Записи за&nbsp;{{ periodName }}</h3>
    <b-row>
      <b-col lg="6">
        <TableCommon :fields="fields" :items="items" class="mb-lg-32" details-td-class="table-details-wrapper" fixed>
          <template #cell(category_id)="{ value }"> {{ categoryById(value).name }} </template>
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
      </b-col>
    </b-row>
    <GridMonths />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        { key: 'category_id', label: 'Категория', thClass: 'th-category', tdClass: 'td-category' },
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
