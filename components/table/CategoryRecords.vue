<template>
  <DataTable
    :children-fields="tableChildrenFields"
    :fields="tableFields"
    :items="tableItems"
    class="table-category-records mb-0"
  />
</template>

<script>
import { formatSum } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  props: {
    records: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      tableChildrenFields: [
        {
          key: 'created_at',
          tdClass: 'cell-date',
          formatter: this.formatChildDate,
        },
        {
          key: 'sum',
          tdClass: 'cell-sum',
          formatter: this.formatSumWithCurrency,
        },
        {
          key: 'note',
          tdClass: 'cell-note',
        },
      ],
      tableFields: [
        {
          key: 'date',
          label: 'Дата',
          thClass: 'cell-date',
          tdClass: 'cell-date',
          formatter: this.formatPeriod,
        },
        {
          key: 'sum',
          label: 'Сумма',
          thClass: 'cell-sum',
          tdClass: 'cell-sum',
          isDetailsToggle: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['locale']),
    tableItems() {
      if (!this.records) return []
      return Object.keys(this.records).map((key) => {
        const sum =
          this.records[key]?.reduce(
            (total, record) => (total += parseInt(record.sum || 0)),
            0
          ) || 0
        return {
          date: key,
          children: this.records[key] || [],
          sum: this.formatSumWithCurrency(sum),
        }
      })
    },
  },
  methods: {
    formatSum,
    formatChildDate(datestring) {
      const date = new Date(datestring)
      return date.toLocaleString(this.locale, { dateStyle: 'short' })
    },
    formatPeriod(period) {
      if (!period) return
      const periodArr = `${period}`.split('-')
      const year = periodArr[0]
      const month = periodArr[1] || 1
      const date = new Date(parseInt(year), parseInt(month) - 1)

      const YY = date.toLocaleString(this.locale, { year: '2-digit' })
      const MM = date.toLocaleString(this.locale, { month: 'long' })
      return `${MM} ${YY}`
    },
    formatSumWithCurrency(sum) {
      return `${this.formatSum(sum)}\xA0₽`
    },
  },
}
</script>

<style lang="scss" scoped>
.table-category-records {
  table-layout: fixed;

  ::v-deep {
    .cell-date {
      width: 35%;
      text-transform: capitalize;
    }

    .cell-sum {
      width: 65%;
    }

    .row-details {
      .table {
        table-layout: fixed;
      }

      .cell-sum {
        width: 25%;
      }

      .cell-note {
        width: 40%;
      }
    }
  }
}
</style>
