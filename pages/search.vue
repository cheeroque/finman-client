<template>
  <PageWrapper>
    <main class="mb-16">
      <transition name="fade" mode="out-in">
        <RecordList
          :key="$route.fullPath"
          :records="searchResults"
          class="mb-16"
          display-variant
        >
          <template #header>
            <SearchResultsHeader :query="query.q" :total="searchResultsTotal" />
          </template>
        </RecordList>
      </transition>
      <PaginationNav :total-pages="totalPages" />
    </main>
    <FloatingButton title="Добавить запись" @click="createRecord" />
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ query, store, error }) {
    try {
      await store.dispatch('fetchSearchResults', query)
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    ...mapGetters(['searchResults', 'searchResultsTotal']),
    query() {
      return this.$route.query
    },
    totalPages() {
      return Math.ceil(this.searchResultsTotal / (this.query.perPage || 50))
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
        await this.$store.dispatch('fetchSearchResults', this.query)
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
    createRecord() {
      this.$dialogFullscreen(
        'RecordForm',
        { recordId: null },
        { title: 'Создать запись' }
      )
    },
  },
}
</script>
