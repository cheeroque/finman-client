<template>
  <f-modal v-model="localVisible" title="Поиск по записям" hide-footer>
    <SearchForm @submit="localVisible = false" />
  </f-modal>
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
