<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`head-${index}`"
            :class="field.thClass"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, rowIndex) in items">
          <tr
            :key="`row-${rowIndex}`"
            :class="{ 'details-open': rowDetailsOpen[rowIndex] }"
          >
            <td
              v-for="(field, colIndex) in fields"
              :key="`cell-${rowIndex}-${colIndex}`"
              :class="field.tdClass"
            >
              <slot
                :name="`cell-${field.key}`"
                :details-open="rowDetailsOpen[rowIndex]"
                :field="field"
                :index="rowIndex"
                :item="item"
                :toggle-details="toggleDetails"
                :value="item[field.key]"
              >
                {{ item[field.key] }}
              </slot>
            </td>
          </tr>
          <tr
            v-if="item.children && item.children.length"
            v-show="rowDetailsOpen[rowIndex]"
            :key="`row-details-${rowIndex}`"
            class="row-details"
          >
            <td :colspan="fields.length" class="row-details-td">
              <slot name="row-details" :item="item"> </slot>
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
  },
  data() {
    return {
      rowDetailsOpen: [],
    }
  },
  created() {
    this.populateRowDetails()
  },
  methods: {
    populateRowDetails() {
      this.items.forEach(() => this.rowDetailsOpen.push(false))
    },
    toggleDetails(index) {
      const oldValue = this.rowDetailsOpen[index]
      this.rowDetailsOpen.splice(index, 1, !oldValue)
    },
  },
}
</script>
