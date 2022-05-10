<template>
  <PageWrapper>
    <main class="mb-16">
      <RecordList
        :loading="loading"
        :records="records"
        :class="{ 'show-all': !query.show }"
        class="mb-24"
        display-variant
      />
      <PaginationNav :total-pages="totalPages" />
    </main>
    <FloatingButton :title="$t('record.add')" @click="createRecord" />
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PagesIndex',
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ query, store, error }) {
    try {
      await store.dispatch('fetchRecords', query)
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['records', 'recordsTotal']),
    query() {
      return this.$route.query
    },
    totalPages() {
      return Math.ceil(this.recordsTotal / (this.query.perPage || 50))
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
      try {
        this.loading = true
        await this.$store.dispatch('fetchRecords', this.query)
        if (process.client) {
          /* Scroll both window (for mobile) & content (for desktop) */
          const content = document.querySelector('.app-content')
          if (content) content.scrollTo({ top: 0, behavior: 'smooth' })
          scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.loading = false
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
    createRecord() {
      this.$dialogFullscreen(
        'RecordForm',
        { recordId: null },
        { title: this.$t('record.create') }
      )
    },
  },
}
</script>
