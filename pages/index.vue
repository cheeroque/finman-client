<template>
  <div>
    <HeaderMain />

    <main class="container mb-16">
      <transition name="fade" mode="out-in">
        <ListRecords
          :key="$route.fullPath"
          :records="records"
          class="mb-16"
          display-variant
        />
      </transition>
      <PaginationNav :total-pages="totalPages" />
    </main>

    <FloatingButton link="/records/create" title="Добавить запись" />
  </div>
</template>

<script>
export default {
  transition: {
    name: 'dialog-page',
  },
  async asyncData({ query, store, error }) {
    const order = query.order || 'DESC'
    const orderBy = query.orderBy || 'created_at'
    const page = query.page || 1
    const perPage = query.perPage || 50
    const show = null
    try {
      const { data, total } = await store.dispatch('fetchRecords', {
        order,
        orderBy,
        page,
        perPage,
        show,
      })
      const totalPages = Math.ceil(total / perPage)
      return {
        order,
        orderBy,
        page,
        perPage,
        records: data,
        totalPages,
        totalRows: total,
      }
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
  methods: {
    async fetchRecords() {
      const order = this.$route.query.order || 'DESC'
      const orderBy = this.$route.query.orderBy || 'created_at'
      const page = this.$route.query.page || 1
      const perPage = this.$route.query.perPage || 50
      const show = null
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
        if (process.client) scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
  },
}
</script>
