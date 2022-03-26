<template>
  <DialogCategory :category="category" :loading="loading" />
</template>

<script>
export default {
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ params, store, error }) {
    const loading = false
    try {
      const category = await store.dispatch('fetchCategoryById', params.id)
      return { category, loading }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
