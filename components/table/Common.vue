<template>
  <transition name="fade" mode="out-in">
    <b-table-lite
      :details-td-class="detailsTdClass"
      :fields="fields"
      :fixed="fixed"
      :items="items"
      :responsive="responsive"
      :small="small"
      :table-class="tableClass"
      :thead-class="theadClass"
      borderless
      striped
      @head-clicked="onHeadClicked"
    >
      <template v-for="field in fields" #[`head(${field.key})`]="{ column, label }">
        <slot :name="`head(${field.key})`" :column="column" :field="field" :label="label">
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
          :field="field"
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
</template>

<script>
export default {
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
    },
    tableClass: {
      type: [Array, Object, String],
      default: null
    },
    theadClass: {
      type: [Array, Object, String],
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
