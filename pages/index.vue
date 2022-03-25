<template>
  <PageWrapper>
    <main class="mb-16">
      <transition name="fade" mode="out-in">
        <RecordsList
          :key="$route.fullPath"
          :records="records"
          :class="{ 'show-all': !query.show }"
          class="mb-16"
          display-variant
        />
      </transition>
      <PaginationNav :total-pages="totalPages" />
    </main>
    <FloatingButton link="/records/create" title="Добавить запись" />
  </PageWrapper>
</template>

<script>
export default {
  transition: {
    name: 'page',
    mode: '',
  },
  async asyncData({ query, store, error }) {
    const order = query.order || 'DESC'
    const orderBy = query.orderBy || 'created_at'
    const page = query.page || 1
    const perPage = query.perPage || 50
    const show = query.show || null
    try {
      const { data, total } = await store.dispatch('fetchRecords', {
        order,
        orderBy,
        page,
        perPage,
        show,
      })
      const totalPages = Math.ceil(total / perPage)
      return { records: data, totalPages, totalRows: total }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler() {
        this.fetchRecords()
      },
    },
  },
  computed: {
    query() {
      return this.$route.query
    },
  },
  methods: {
    async fetchRecords() {
      const order = this.query.order || 'DESC'
      const orderBy = this.query.orderBy || 'created_at'
      const page = this.query.page || 1
      const perPage = this.query.perPage || 50
      const show = this.query.show || null
      try {
        const { data, total } = await this.$store.dispatch('fetchRecords', {
          order,
          orderBy,
          page,
          perPage,
          show,
        })
        this.records = data
        this.totalRows = total
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

<style lang="scss" scoped>
@include media-min-width('md') {
  ::v-deep {
    .page-content {
      border-radius: $card-border-radius;
      background-color: $card-bg;
      overflow: hidden;
    }

    .pagination {
      padding: 0 1.5rem;
    }
  }
}
</style>
