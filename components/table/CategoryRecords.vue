<template>
  <div class="card p-0">
    <DataTable
      :fields="tableFields"
      :items="tableItems"
      class="table-category-records"
    >
      <template #cell-date="{ value }">
        {{ formatPeriod(value) }}
      </template>
      <template #cell-sum="{ detailsOpen, index, value, toggleDetails }">
        <button
          :class="{ collapsed: !detailsOpen }"
          class="btn btn-details-toggle"
          @click="toggleDetails(index)"
        >
          <span>{{ formatSum(value, locale) }}&nbsp;₽</span>
          <svg-icon
            name="caret"
            width="10"
            height="6"
            class="caret"
            aria-hidden="true"
          />
        </button>
      </template>
      <template #row-details="{ item }">
        <TableCategoryRecordChildren
          :fields="tableDetailsFields"
          :items="item.children"
        >
          <template #cell-created_at="{ value }">
            {{ formatChildDate(value) }}
          </template>
          <template #cell-sum="{ value }">
            {{ formatSum(value, locale) }}&nbsp;₽
          </template>
          <template #cell-note="{ item, value }">
            <nuxt-link :to="`/records/${item.id}`">{{ value }}</nuxt-link>
          </template>
        </TableCategoryRecordChildren>
      </template>
    </DataTable>
  </div>
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
      tableFields: [
        {
          key: 'date',
          label: 'Дата',
          thClass: 'cell-date',
          tdClass: 'cell-date',
        },
        {
          key: 'sum',
          label: 'Сумма',
          thClass: 'cell-sum',
          tdClass: 'cell-sum cell-details-toggle',
        },
      ],
      tableDetailsFields: [
        { key: 'created_at', tdClass: 'cell-date' },
        { key: 'sum', tdClass: 'cell-sum' },
        { key: 'note', tdClass: 'cell-note' },
      ],
    }
  },
  computed: {
    ...mapGetters(['locale']),
    tableItems() {
      if (!this.records) return []
      return Object.keys(this.records).map((key) => ({
        date: key,
        children: this.records[key] || [],
        sum:
          this.records[key]?.reduce(
            (total, record) => (total += parseInt(record.sum || 0)),
            0
          ) || 0,
      }))
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
