<template>
  <div class="table-card">
    <transition :name="transition" mode="out-in">
      <b-table-lite
        :details-td-class="detailsTdClass"
        :fields="fields"
        :fixed="fixed"
        :items="items"
        :small="small"
        :table-class="tableClass"
        borderless
        responsive
        striped
        @head-clicked="onHeadClicked"
        @sort-changed="(event) => $emit('sort-changed', event)"
      >
        <template v-for="hField in fields" #[`head(${hField.key})`]="{ column, field, label }">
          <slot :name="`head(${hField.key})`" :column="column" :field="field" :label="label">
            {{ label }}
            <component
              :is="`b-icon-sort-${order === 'DESC' ? 'down' : 'up'}`"
              v-if="field.sortable && orderBy === column"
            ></component>
          </slot>
        </template>
        <template
          v-for="field in fields"
          #[`cell(${field.key})`]="{ detailsShowing, index, item, toggleDetails, unformatted, value }"
        >
          <slot
            :name="`cell(${field.key})`"
            :details-showing="detailsShowing"
            :index="index"
            :item="item"
            :toggleDetails="toggleDetails"
            :unformatted="unformatted"
            :value="value"
          >
            {{ value }}
          </slot>
        </template>
        <template #row-details="{ index, item, toggleDetails }">
          <slot name="row-details" :fields="fields" :index="index" :item="item" :toggleDetails="toggleDetails"></slot>
        </template>
      </b-table-lite>
    </transition>
  </div>
</template>

<script>
import { BTableLite, BIconSortUp, BIconSortDown } from 'bootstrap-vue'

export default {
  components: {
    BTableLite,
    BIconSortUp,
    BIconSortDown
  },
  props: {
    detailsTdClass: {
      type: [Array, Object, String],
      default() {
        return null
      }
    },
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    fixed: {
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
    orderBy: {
      type: String,
      default: null
    },
    order: {
      type: String,
      default: null
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
    transition: {
      type: String,
      default: null
    }
  },
  methods: {
    onHeadClicked(key, field) {
      if (field.sortable) {
        if (key === this.orderBy) {
          this.$emit('sort-changed', { orderBy: key, order: this.order === 'DESC' ? 'ASC' : 'DESC' })
        } else {
          this.$emit('sort-changed', { orderBy: key, order: 'DESC' })
        }
      } else {
        this.$emit('sort-reset')
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

  .td-datetime {
    .time {
      font-size: 0.875em;
      color: $gray-500;

      &::before {
        display: inline;
        content: '@ ';
      }
    }
  }

  .td-sum {
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

    .td-datetime {
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
