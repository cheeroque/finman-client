<template>
  <DataTable
    :children-fields="tableChildrenFields"
    :fields="tableFields"
    :items="tableItems"
    class="table-fixed mb-0"
  >
    <template #tbody-after>
      <tr role="row" class="row-total row-total-expenses">
        <td class="cell-category">
          {{ $t('expensesTotal') }}
        </td>
        <td class="cell-sum">
          {{ formatSumWithCurrency(expensesTotal) }}
        </td>
      </tr>
      <tr v-if="incomesTotal" role="row" class="row-total row-total-incomes">
        <td class="cell-category">
          {{ $t('incomesTotal') }}
        </td>
        <td class="cell-sum">
          {{ formatSumWithCurrency(incomesTotal) }}
        </td>
      </tr>
    </template>
  </DataTable>
</template>

<script>
import { formatSum } from '@/utils'

export default {
  props: {
    categories: {
      type: [Array, Object],
      default() {
        return []
      },
    },
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
          key: 'category_name',
          label: this.$t('category.category'),
          thClass: 'cell-category',
          tdClass: 'cell-category',
        },
        {
          key: 'sum',
          label: this.$t('sum'),
          thClass: 'cell-sum',
          tdClass: 'cell-sum',
          formatter: this.formatSumWithCurrency,
          isDetailsToggle: true,
        },
      ],
    }
  },
  computed: {
    expensesTotal() {
      return this.tableItems
        .filter(({ is_income }) => !is_income)
        .reduce((total, cur) => (total += cur.sum), 0)
    },
    incomesTotal() {
      const incomeCategories = this.tableItems.filter(
        ({ is_income }) => is_income
      )
      return incomeCategories?.length > 1
        ? incomeCategories.reduce((total, cur) => (total += cur.sum), 0)
        : null
    },
    tableItems() {
      if (!this.records) return []
      return Object.keys(this.records)
        .map((key) => {
          const category = this.getCategory(key)
          const sum =
            this.records[key]?.reduce(
              (total, record) => (total += parseInt(record.sum || 0)),
              0
            ) || 0
          return {
            category_name: category?.name,
            children: this.records[key] || [],
            is_income: category?.is_income,
            row_class: category?.is_income ? 'row-incomes' : null,
            sum,
          }
        })
        .sort((a, b) => b.sum - a.sum)
        .sort((a, b) => a.is_income - b.is_income)
    },
  },
  methods: {
    formatSum,
    getCategory(categoryId) {
      return (
        this.categories.find(
          ({ id }) => parseInt(id) === parseInt(categoryId)
        ) || {}
      )
    },
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
  .cell-category {
    width: 35%;
  }

  .cell-sum {
    width: 65%;
  }

  .row-details {
    .cell-date {
      width: 35%;
    }

    .cell-sum {
      width: 25%;
    }

    .cell-note {
      width: 40%;
    }
  }

  .row-incomes {
    color: var(--success);
  }

  .row-total {
    font-weight: $font-weight-medium;

    .cell-sum {
      font-weight: inherit;
    }
  }

  .row-total-expenses {
    color: var(--on-danger-container);
    background-color: var(--danger-container);
  }

  .row-total-incomes {
    color: var(--on-success-container);
    background-color: var(--success-container);
  }
}
</style>
