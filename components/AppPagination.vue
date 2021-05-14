<template>
  <div ref="wrapper">
    <b-pagination
      v-model="localValue"
      :align="align"
      :disabled="disabled"
      :per-page="perPage"
      :size="size"
      :total-rows="totalRows"
    ></b-pagination>
  </div>
</template>

<script>
import { BPagination } from 'bootstrap-vue'

export default {
  components: {
    BPagination
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    align: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    perPage: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: String,
      default: null
    },
    totalRows: {
      type: [Number, String],
      default: 0
    },
    value: {
      type: [Boolean, Number, String],
      default: null
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
