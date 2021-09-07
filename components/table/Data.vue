<template>
  <table :aria-colcount="fields.length" class="table table-data table-striped table-fixed">
    <thead>
      <tr>
        <th
          v-for="(field, index) in fields"
          :key="`head-${field.key}`"
          :aria-colindex="index + 1"
          :aria-sort="field.sortable && orderBy === field.key ? orderFull : 'none'"
          :class="`${field.thClass || ''} ${field.sortable ? 'sortable' : ''}`"
          tabindex="0"
          @click="onHeadClick(field)"
        >
          <div class="d-flex align-center">
            {{ field.label }}
            <svg-icon
              v-if="field.sortable && orderBy === field.key"
              :name="`sort-${order.toString().toLowerCase()}-24`"
              width="24"
              height="24"
              class="ms-8"
              aria-hidden="true"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in items"
        :key="`row-${rowIndex}`"
        :class="row.rowVariant ? `table-${row.rowVariant}` : null"
      >
        <td v-for="cell in fields" :key="`cell-${cell.key}-${rowIndex}`" :class="cell.tdClass">
          <slot :name="`cell(${cell.key})`" :field="cell" :index="rowIndex" :item="row" :value="row[cell.key]">
            {{ row[cell.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    order: {
      type: String,
      default: null
    },
    orderBy: {
      type: String,
      default: null
    }
  },
  computed: {
    orderFull() {
      if (this.order === 'ASC') return 'ascending'
      else if (this.order === 'DESC') return 'descending'
      else return null
    }
  },
  methods: {
    onHeadClick(field) {
      if (field.sortable) {
        if (field.key === this.orderBy) {
          this.$emit('sort-changed', { orderBy: field.key, order: this.order === 'DESC' ? 'ASC' : 'DESC' })
        } else {
          this.$emit('sort-changed', { orderBy: field.key, order: 'DESC' })
        }
      } else {
        this.$emit('sort-reset')
      }
    }
  }
}
</script>
