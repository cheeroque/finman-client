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
      <tbody role="rowgroup">
        <template v-for="(item, index) in items">
          <tr
            :key="`row-${index}`"
            :class="{ 'details-open': openRowIndex === index }"
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
                :class="{ collapsed: openRowIndex !== index }"
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
            v-if="hasDetails(item)"
            v-show="openRowIndex === index"
            :key="`row-details-${index}`"
            role="row"
            class="row-details"
          >
            <td :colspan="fields.length" class="row-details-cell">
              <DataTable
                :fields="childrenFields"
                :items="item.children"
                table-class="table-details"
                class="mb-0"
                disable-head
              >
                <template #cell-note="{ item }">
                  <nuxt-link :to="`/records/${item.id}`">
                    {{ item.note }}
                  </nuxt-link>
                </template>
              </DataTable>
            </td>
          </tr>
        </template>
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
      openRowIndex: -1,
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
    toggleDetails(index) {
      if (this.openRowIndex !== index) {
        this.openRowIndex = index
      } else {
        this.openRowIndex = -1
      }
    },
  },
}
</script>
