<template>
  <div class="dialog-fullscreen">
    <header class="dialog-header">
      <nuxt-link to="/categories" class="btn dialog-header-back">
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </nuxt-link>
      <h4 class="dialog-title mb-0">{{ category.name }}</h4>
      <nuxt-link to="/categories" class="btn dialog-header-action">
        Категории
      </nuxt-link>
    </header>

    <main class="container mb-12">
      <TableCategoryRecords :records="records" />
    </main>
  </div>
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
