<template>
  <div :class="{ 'pb-24': !!total }" class="table-card">
    <transition :name="transition" mode="out-in">
      <b-table
        :key="currentPage"
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
    </transition>

    <app-pagination
      v-if="total"
      v-model="localCurrentPage"
      :per-page="perPage"
      :total-rows="total"
      align="center"
    ></app-pagination>
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
    },
    transition: {
      type: String,
      default: null
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

<style lang="scss" scoped>
.table-card /deep/ {
  .table {
    thead {
      font-size: $font-size-1;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      color: $gray-500;
    }

    line-height: 1.25;
  }

  .table-cell-datetime {
    .time {
      font-size: 0.875em;
      color: $gray-500;

      &::before {
        display: inline;
        content: '@ ';
      }
    }
  }

  .table-cell-sum {
    font-weight: $font-weight-bold;
    font-variant-numeric: tabular-nums;
  }

  .row-details-toggle {
    display: flex;

    .caption {
      flex: 1 1 auto;
    }

    .icon {
      flex: 0 0 auto;
      margin-left: 0.25rem;
      color: $gray-300;
    }
  }

  @include media-breakpoint-down(md) {
    .table {
      font-size: $font-size-1;

      thead {
        font-size: $font-size-0;
        border-bottom: $border-width solid $gray-300;
        background-color: $gray-100;
      }

      th,
      td {
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;
      }

      &.b-table {
        & > thead,
        & > tfoot {
          & > tr {
            & > [aria-sort] {
              &:not(.b-table-sort-icon-left),
              &.b-table-sort-icon-left {
                background-image: none;
                padding-left: $grid-gutter-width / 2;
                padding-right: $grid-gutter-width / 2;
              }
            }
          }
        }
      }
    }

    .table-cell-datetime {
      .time {
        display: none;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    border-radius: $border-radius;
    background-color: $white;
    box-shadow: $box-shadow-sm;

    .table {
      th,
      td {
        padding: 0.75rem $grid-gutter-width;
      }

      &.b-table {
        & > thead,
        & > tfoot {
          & > tr {
            & > th[aria-sort] {
              &:not(.b-table-sort-icon-left) {
                padding-left: $grid-gutter-width;
                padding-right: $grid-gutter-width;
              }

              &.b-table-sort-icon-left {
                padding-left: $grid-gutter-width;
                padding-right: $grid-gutter-width;
                background-position: left 0.75rem center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
