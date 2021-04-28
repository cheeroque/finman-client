<template>
  <b-modal v-model="localVisible" @hide="$emit('hide')">
    <form-record-edit create @change="localVisible = false"></form-record-edit>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'
import FormRecordEdit from '@/components/FormRecordEdit'

export default {
  components: {
    BModal,
    FormRecordEdit
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
