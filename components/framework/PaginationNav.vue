<template>
  <nav v-if="totalPages > 1" ref="pagination" class="pagination">
    <ul class="nav pagination-nav">
      <li role="presentation">
        <component
          :is="isBeginning ? 'span' : 'nuxt-link'"
          :to="isBeginning ? null : localePath(getPageLink(1))"
          :class="{ disabled: isBeginning }"
          :aria-label="$t('pagination.goToFirst')"
          class="btn nav-item nav-item-first"
        >
          <svg-icon
            name="chevron-double-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </component>
      </li>
      <li
        v-for="page in visiblePages"
        :key="`page-${page}`"
        role="presentation"
      >
        <component
          :is="page === currentPage ? 'span' : 'nuxt-link'"
          :to="page === currentPage ? null : localePath(getPageLink(page))"
          :class="{ active: page === currentPage }"
          :aria-label="`${$t('pagination.goToPage')} ${page}`"
          class="btn nav-item"
        >
          {{ page }}
        </component>
      </li>
      <li role="presentation">
        <component
          :is="isEnd ? 'button' : 'nuxt-link'"
          :to="isEnd ? null : localePath(getPageLink(totalPages))"
          :class="{ disabled: isEnd }"
          :disabled="isEnd"
          :aria-label="$t('pagination.goToLast')"
          class="btn nav-item nav-item-last"
        >
          <svg-icon
            name="chevron-double-right-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </component>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    linkGen: {
      type: Function,
      default: null,
    },
    totalPages: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      observer: null,
    }
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    isBeginning() {
      return this.currentPage <= 1
    },
    isEnd() {
      return this.currentPage >= this.totalPages
    },
    pagePrevious() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    pageNext() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    },
    visiblePages() {
      const pages = []
      let start, end
      if (this.totalPages <= 5) {
        start = 1
        end = this.totalPages
      } else {
        start = this.currentPage > 3 ? this.currentPage - 2 : 1
        end = start + 4
        if (end > this.totalPages) {
          const diff = end - this.totalPages
          end -= diff
          start -= diff
        }
      }
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    },
  },
  mounted() {
    this.setObserver()
  },
  beforeDestroy() {
    this.removeObserver()
  },
  methods: {
    ...mapActions(['setScrolledToBottom']),
    getOffsetTop() {
      if (!process.client) return
      return Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )
    },
    getPageLink(pageNumber) {
      const query = { ...this.$route.query }
      if (pageNumber !== 1) query.page = pageNumber
      else delete query.page
      return typeof this.linkGen === 'function'
        ? this.linkGen(pageNumber)
        : { ...this.$route, query }
    },
    removeObserver() {
      if (
        this.$refs.pagination &&
        this.observer instanceof IntersectionObserver
      ) {
        this.observer.unobserve(this.$refs.pagination)
      }
    },
    setObserver() {
      if ('IntersectionObserver' in window) {
        if (!this.$refs.pagination) return
        this.observer = new IntersectionObserver(([{ isIntersecting }]) => {
          const offsetTop = this.getOffsetTop()
          if (offsetTop > 0) {
            this.setScrolledToBottom(isIntersecting)
          }
        })
        this.observer.observe(this.$refs.pagination)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-nav {
  gap: 0.5rem;

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.5rem;
    font-size: $btn-font-size;
    border-radius: $card-border-radius;
    color: var(--on-surface);
    background-color: var(--surface);

    &:disabled,
    &.disabled {
      opacity: 0.5;
    }

    &.active {
      color: var(--on-primary);
      background-color: var(--primary);
    }
  }
}
</style>
