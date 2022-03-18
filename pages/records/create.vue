<template>
  <DialogRecord :categories="categories" :loading="loading" :record="record" />
</template>

<script>
export default {
  transition: {
    name: 'page',
    mode: '',
  },
  async asyncData({ store, error }) {
    const loading = false
    const record = {
      category_id: null,
      created_at: new Date(),
      id: null,
      note: null,
      sum: 0,
    }
    try {
      const categories = await store.dispatch('fetchCategories')
      return { categories, loading, record }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
