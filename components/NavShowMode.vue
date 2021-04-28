<template>
  <b-form-radio-group v-model="localValue" :options="options" button-variant="light" buttons></b-form-radio-group>
</template>

<script>
import { BFormRadioGroup } from 'bootstrap-vue'

export default {
  components: {
    BFormRadioGroup
  },
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default() {
        return [
          { value: 'expense', text: 'Расходы' },
          { value: 'income', text: 'Доходы' },
          { value: null, text: 'Всё сразу' }
        ]
      }
    }
  },
  computed: {
    localValue: {
      get() {
        return this.checked
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
