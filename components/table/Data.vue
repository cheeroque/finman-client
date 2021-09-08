<template>
  <table :aria-colcount="fields.length" class="table table-data table-striped table-fixed">
    <thead v-if="!hideThead">
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
              class="icon-sort ms-8"
              aria-hidden="true"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, rowIndex) in items">
        <tr :key="`row-${rowIndex}`" :data-index="rowIndex" :class="getRowClasses(row, rowIndex)">
          <td v-for="cell in fields" :key="`cell-${cell.key}-${rowIndex}`" :class="cell.tdClass">
            <slot
              :name="`cell(${cell.key})`"
              :details-visible="isDetailsVisible(rowIndex)"
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
        <tr v-if="isDetailsVisible(rowIndex)" :key="`row-details-${rowIndex}`" class="row-details">
          <td :colspan="fields.length">
            <FCollapse :open="isCollapseOpen(rowIndex)" :transition-duration="collapseTransitionDuration">
              <slot name="row-details" :details-visible="isDetailsVisible(rowIndex)" :item="row"></slot>
            </FCollapse>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    collapseTransitionDuration: {
      type: [Number, String],
      default: 200
    },
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    hideThead: {
      type: Boolean,
      default() {
        return false
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
      collapseOpen: [],
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
    getRowClasses(row, rowIndex) {
      const cls = row.rowVariant ? [`table-${row.rowVariant}`] : []
      if (this.isDetailsVisible(rowIndex)) cls.push('row-has-details')
      return cls.join(' ')
    },
    isCollapseOpen(rowIndex) {
      return this.collapseOpen.includes(rowIndex)
    },
    isDetailsVisible(rowIndex) {
      return this.detailsVisible.includes(rowIndex)
    },
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
      const clickedRow = target.closest('tr')
      const rowIndex = clickedRow ? parseInt(clickedRow.dataset.index) : -1
      const detailsIndex = this.detailsVisible.findIndex((i) => i === rowIndex)
      const collapseIndex = this.collapseOpen.findIndex((i) => i === rowIndex)
      if (detailsIndex > -1) {
        this.collapseOpen.splice(collapseIndex, 1)
        setTimeout(() => {
          this.detailsVisible.splice(detailsIndex, 1)
        }, this.collapseTransitionDuration)
      } else {
        this.detailsVisible.push(rowIndex)
        setTimeout(() => {
          this.collapseOpen.push(rowIndex)
        }, 1)
      }
    }
  }
}
</script>
