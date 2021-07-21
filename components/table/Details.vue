<template>
  <TableCommon
    :fields="fields"
    :items="items"
    :responsive="responsive"
    :small="small"
    table-class="table-details"
    thead-class="d-none"
    class="mb-0"
    fixed
  >
    <template
      v-for="field in fields"
      #[`cell(${field.key})`]="{ detailsShowing, index, item, toggleDetails, unformatted, value }"
    >
      <slot
        :name="`cell(${field.key})`"
        :details-showing="detailsShowing"
        :field="detailField"
        :index="index"
        :item="item"
        :toggleDetails="toggleDetails"
        :unformatted="unformatted"
        :value="value"
      >
        {{ value }}
      </slot>
    </template>
  </TableCommon>
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
    responsive: {
      type: [Boolean, String],
      default() {
        return false
      }
    },
    small: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
