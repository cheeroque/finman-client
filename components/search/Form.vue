<template>
  <form class="form-search" @submit.prevent="onSubmit">
    <f-form-group :class="hideButton ? 'mb-0' : 'mb-24'">
      <f-input v-model="query" :size="inputSize" type="search" placeholder="Поиск по записям" />
    </f-form-group>
    <button
      v-if="!hideButton"
      :disabled="!(query && query.length)"
      type="submit"
      class="btn btn-block btn-lg btn-primary"
    >
      Поиск
    </button>
  </form>
</template>

<script>
export default {
  props: {
    hideButton: {
      type: Boolean,
      default() {
        return false
      }
    },
    inputSize: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      query: null
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit')
      this.$router.push({ path: '/search', query: { q: this.query } })
      this.query = null
    }
  }
}
</script>

<style lang="scss" scoped>
.form-search {
  width: 100%;
}
</style>
