<template>
  <div class="table-wrapper">
    <table :class="tableClass" role="grid" class="table">
      <thead v-if="!disableHead" role="rowgroup">
        <tr role="row">
          <th
            v-for="field in fields"
            :key="`head-${field.key}`"
            :class="field.thClass"
            role="columnheader"
          >
            <span class="cell-content">
              {{ field.label }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody v-if="items && items.length" role="rowgroup">
        <template v-for="(item, index) in items">
          <tr
            :key="`row-${index}`"
            :class="{ 'details-open': isDetailsVisible(index) }"
            role="row"
          >
            <td
              v-for="field in fields"
              :key="`cell-${index}-${field.key}`"
              :class="[
                field.tdClass,
                hasDetails(item, field) ? 'cell-details-toggle' : null,
              ]"
            >
              <button
                v-if="hasDetails(item, field)"
                :class="{ collapsed: !isDetailsVisible(index) }"
                class="btn btn-details-toggle cell-content"
                @click="toggleDetails(index)"
              >
                <span>{{ getValue(item, field) }}</span>
                <svg-icon
                  name="caret"
                  width="10"
                  height="6"
                  class="caret"
                  aria-hidden="true"
                />
              </button>
              <span v-else class="cell-content">
                <slot :name="`cell-${field.key}`" :field="field" :item="item">
                  {{ getValue(item, field) }}
                </slot>
              </span>
            </td>
          </tr>
          <tr
            v-if="!disableDetails"
            v-show="isDetailsVisible(index)"
            :key="`row-details-${index}`"
            role="row"
            class="row-details"
          >
            <td :colspan="fields.length" class="row-details-cell">
              <Collapse
                :open="isCollapseOpen(index)"
                @closed="onCollapseClosed(index)"
              >
                <DataTable
                  :fields="childrenFields"
                  :items="item.children"
                  table-class="table-details"
                  class="mb-0"
                  disable-details
                  disable-head
                >
                  <template #cell-note="{ item: detailsItem }">
                    <nuxt-link :to="`/records/${detailsItem.id}`">
                      {{ detailsItem.note }}
                    </nuxt-link>
                  </template>
                </DataTable>
              </Collapse>
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-else role="rowgroup">
        <tr role="row">
          <td :colspan="fields.length" class="table-empty-cell">
            Нет&nbsp;данных для&nbsp;отображения.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    childrenFields: {
      type: Array,
      default() {
        return []
      },
    },
    disableDetails: {
      type: Boolean,
      default: false,
    },
    disableHead: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default() {
        return []
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    tableClass: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      detailsVisible: [],
      collapseOpen: [],
    }
  },
  methods: {
    getValue(item, field) {
      if (field.itemFormatter && typeof field.itemFormatter === 'function') {
        return field.itemFormatter(item)
      } else if (field.formatter && typeof field.formatter === 'function') {
        return field.formatter(item[field.key])
      } else {
        return item[field.key]
      }
    },
    hasDetails(item, field) {
      return (
        item.children &&
        item.children.length &&
        (!field || field.isDetailsToggle)
      )
    },
    isCollapseOpen(rowIndex) {
      return this.collapseOpen.includes(rowIndex)
    },
    isDetailsVisible(index) {
      return this.detailsVisible.includes(index)
    },
    onCollapseClosed(index) {
      const detailsIndex = this.detailsVisible.findIndex((i) => i === index)
      this.detailsVisible.splice(detailsIndex, 1)
    },
    toggleDetails(index) {
      const detailsIndex = this.detailsVisible.findIndex((i) => i === index)
      const collapseIndex = this.collapseOpen.findIndex((i) => i === index)
      if (detailsIndex > -1) {
        this.collapseOpen.splice(collapseIndex, 1)
      } else {
        this.detailsVisible.push(index)
        this.collapseOpen.push(index)
      }
    },
  },
}
</script>
