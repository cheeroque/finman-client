<template>
  <div class="table-card">
    <b-table
      :fields="fields"
      :items="items"
      :fixed="fixed"
      :small="small"
      :table-class="tableClass"
      borderless
      responsive
      sort-icon-left
      striped
      @sort-changed="(event) => $emit('sort-changed', event)"
    >
      <template
        v-for="field in fields"
        #[`cell(${field.key})`]="{
          detailsShowing,
          index,
          item,
          rowSelected,
          selectRow,
          toggleDetails,
          unformatted,
          unselectRow,
          value
        }"
      >
        <slot
          :name="`cell(${field.key})`"
          :details-showing="detailsShowing"
          :index="index"
          :item="item"
          :row-selected="rowSelected"
          :select-row="selectRow"
          :toggle-details="toggleDetails"
          :unformatted="unformatted"
          :unselect-row="unselectRow"
          :value="value"
        >
          {{ value }}
        </slot>
      </template>
      <template #row-details="{ index, item, rowSelected, selectRow, toggleDetails, unselectRow }">
        <slot
          :fields="fields"
          :index="index"
          :item="item"
          :row-selected="rowSelected"
          :select-row="selectRow"
          :toggle-details="toggleDetails"
          :unselect-row="unselectRow"
          name="row-details"
        >
        </slot>
      </template>
    </b-table>

    <app-pagination v-if="total" v-model="localCurrentPage" :per-page="perPage" :total-rows="total"></app-pagination>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import AppPagination from '@/components/AppPagination'

export default {
  components: {
    BTable,
    AppPagination
  },
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
    currentPage: {
      type: [Number, String],
      default: 1
    },
    fixed: {
      type: Boolean,
      default() {
        return false
      }
    },
    perPage: {
      type: [Number, String],
      default: 0
    },
    small: {
      type: Boolean,
      default() {
        return false
      }
    },
    tableClass: {
      type: [Array, Object, String],
      default: null
    },
    total: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    localCurrentPage: {
      get() {
        return this.currentPage
      },
      set(newValue) {
        this.$emit('page-changed', newValue)
      }
    }
  }
}
</script>
