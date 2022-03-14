<template>
  <div class="dialog-fullscreen">
    <header class="dialog-header">
      <nuxt-link to="/" class="btn dialog-header-back">
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </nuxt-link>
      <h4 class="dialog-title mb-0">Доходы</h4>
    </header>
    <transition name="fade" mode="out-in">
      <main :key="$route.fullPath" class="container mb-12">
        <ListRecords :records="records" />
      </main>
    </transition>
    <FloatingButton
      link="/records/create?type=income"
      title="Добавить источник доходов"
    />
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
    const show = 'income'
    try {
      const { data, total } = await store.dispatch('fetchRecords', {
        order,
        orderBy,
        page,
        perPage,
        show,
      })
      return {
        order,
        orderBy,
        page,
        perPage,
        records: data,
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
      const show = 'income'
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
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
  },
}
</script>
