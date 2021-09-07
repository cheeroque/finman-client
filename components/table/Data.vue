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
      <template v-for="(row, rowIndex) in items">
        <tr :key="`row-${rowIndex}`" :data-index="rowIndex" :class="row.rowVariant ? `table-${row.rowVariant}` : null">
          <td v-for="cell in fields" :key="`cell-${cell.key}-${rowIndex}`" :class="cell.tdClass">
            <slot
              :name="`cell(${cell.key})`"
              :details-visible="detailsVisible.includes(rowIndex)"
              :field="cell"
              :index="rowIndex"
              :item="row"
              :toggle-details="toggleDetails"
              :value="row[cell.key]"
            >
              {{ row[cell.key] }}
            </slot>
          </td>
        </tr>
        <tr :key="`row-details-${rowIndex}`" v-if="detailsVisible.includes(rowIndex)" class="row-details">
          <td :colspan="fields.length">
            <slot name="row-details" :details-visible="detailsVisible.includes(rowIndex)" :item="row"></slot>
          </td>
        </tr>
      </template>
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
  data() {
    return {
      detailsVisible: []
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
    },
    toggleDetails({ target }) {
      const row = target.closest('tr')
      const rowIndex = row ? parseInt(row.dataset.index) : -1
      const index = this.detailsVisible.findIndex((i) => i === rowIndex)
      if (index > -1) this.detailsVisible.splice(index, 1)
      else this.detailsVisible.push(rowIndex)
    }
  }
}
</script>
