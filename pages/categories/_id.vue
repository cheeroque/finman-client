<template>
  <PageWrapper>
    <PageHeader> {{ category.name }} </PageHeader>
    <main class="card mb-24 p-0">
      <TableCategoryRecords :records="records" />
    </main>
    <PaginationNav :total-pages="totalPages" class="mb-16" />
  </PageWrapper>
</template>

<script>
export default {
  name: 'PagesCategoriesId',
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ query, params, store, error }) {
    const page = query.page || 1
    const perPage = query.perPage || 18
    try {
      const category = await store.dispatch('fetchCategoryById', params.id)
      const { data, total } = await store.dispatch('fetchRecordsByCategory', {
        categoryId: params.id,
        params: { page, perPage },
      })
      const totalPages = Math.ceil(total / perPage)
      return { category, records: data, totalPages }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
  },
  watch: {
    '$route.query': {
      deep: true,
      handler() {
        this.refetch()
      },
    },
  },
  methods: {
    async refetch() {
      const page = this.query.page || 1
      const perPage = this.query.perPage || 18
      try {
        const category = await this.$store.dispatch(
          'fetchCategoryById',
          this.$route.params.id
        )
        const { data, total } = await this.$store.dispatch(
          'fetchRecordsByCategory',
          {
            categoryId: this.$route.params.id,
            params: { page, perPage },
          }
        )
        this.category = category
        this.records = data
        this.totalPages = Math.ceil(total / perPage)
        if (process.client) {
          /* Scroll both window (for mobile) & content (for desktop) */
          const content = document.querySelector('.app-content')
          if (content) content.scrollTo({ top: 0, behavior: 'smooth' })
          scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
  },
}
</script>
