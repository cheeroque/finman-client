<template>
  <b-modal v-model="localVisible" centered @hide="$emit('hide')">
    <FormRecordEdit :item="item" @change="onRecordChange" />
  </b-modal>
</template>

<script>
export default {
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
    },
    item: {
      type: Object,
      default() {
        return {}
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
  },
  methods: {
    onRecordChange() {
      this.localVisible = false
      this.$emit('record-change')
    }
  }
}
</script>
