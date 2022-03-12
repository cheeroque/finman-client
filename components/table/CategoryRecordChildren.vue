<template>
  <table class="table table-details">
    <tbody>
      <tr v-for="(row, rowIndex) in items" :key="`row-${rowIndex}`">
        <td
          v-for="(field, colIndex) in fields"
          :key="`cell-${rowIndex}-${colIndex}`"
          :class="field.tdClass"
        >
          <slot
            :name="`cell-${field.key}`"
            :field="field"
            :index="rowIndex"
            :item="row"
            :value="row[field.key]"
          >
            {{ row[field.key] }}
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
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
