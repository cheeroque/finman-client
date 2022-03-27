<template>
  <DataTable
    :children-fields="tableChildrenFields"
    :fields="tableFields"
    :items="tableItems"
    class="table-fixed mb-0"
  />
</template>

<script>
import { formatPeriod, formatSum } from '@/utils'

export default {
  props: {
    records: {
      type: [Array, Object],
      default() {
        return []
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
          label: this.$t('date'),
          thClass: 'cell-date',
          tdClass: 'cell-date',
          formatter: (value) => this.formatPeriod(value, this.$i18n.locale),
        },
        {
          key: 'sum',
          label: this.$t('sum'),
          thClass: 'cell-sum',
          tdClass: 'cell-sum',
          isDetailsToggle: true,
        },
      ],
    }
  },
  computed: {
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
    formatPeriod,
    formatSum,
    formatChildDate(datestring) {
      const date = new Date(datestring)
      return date.toLocaleString(this.$i18n.locale, { dateStyle: 'short' })
    },
    formatSumWithCurrency(sum) {
      return `${this.formatSum(sum)}\xA0₽`
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .cell-date {
    width: 35%;
    text-transform: capitalize;
  }

  .cell-sum {
    width: 65%;
  }

  .row-details {
    .cell-sum {
      width: 25%;
    }

    .cell-note {
      width: 40%;
    }
  }
}
</style>
