<template>
  <DialogRecord :categories="categories" :loading="loading" :record="record" />
</template>

<script>
export default {
  transition: {
    name: 'dialog-page',
  },
  async asyncData({ params, store, error }) {
    const loading = false
    try {
      const record = await store.dispatch('fetchRecordById', params.id)
      const categories = await store.dispatch('fetchCategories')
      return { categories, loading, record }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
