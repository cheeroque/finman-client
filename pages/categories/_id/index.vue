<template>
  <DialogPage
    :title="category.name"
    action-title="Категории"
    @action="$router.push('/categories')"
  >
    <div class="card mb-12 p-0">
      <TableCategoryRecords :records="records" />
    </div>
  </DialogPage>
</template>

<script>
export default {
  async asyncData({ query, params, store, error }) {
    const page = query.page || 1
    const perPage = query.perPage || 12
    try {
      const category = await store.dispatch('fetchCategoryById', params.id)
      const { data, total } = await store.dispatch('fetchRecordsByCategory', {
        categoryId: params.id,
        params: { page, perPage },
      })
      return { category, records: data, totalRows: total }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
