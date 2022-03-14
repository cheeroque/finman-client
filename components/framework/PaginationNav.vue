<template>
  <nav v-if="totalPages > 1" class="pagination">
    <ul class="nav pagination-nav">
      <li role="presentation">
        <component
          :is="isBeginning ? 'span' : 'nuxt-link'"
          :to="isBeginning ? null : getPageLink(1)"
          :class="{ 'nav-item-disabled': isBeginning }"
          :disabled="isBeginning"
          aria-label="В начало"
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
      <li role="presentation">
        <component
          :is="isBeginning ? 'span' : 'nuxt-link'"
          :to="isBeginning ? null : getPageLink(pagePrevious)"
          :class="{ 'nav-item-disabled': isBeginning }"
          :disabled="isBeginning"
          aria-label="Назад"
          class="btn nav-item nav-item-previous"
        >
          <svg-icon
            name="chevron-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </component>
      </li>
      <li role="presentation">
        <span class="nav-item-text">
          {{ currentPage }} / {{ totalPages }}
        </span>
      </li>
      <li role="presentation">
        <component
          :is="isEnd ? 'span' : 'nuxt-link'"
          :to="isEnd ? null : getPageLink(pageNext)"
          :class="{ 'nav-item-disabled': isEnd }"
          :disabled="isEnd"
          aria-label="Вперед"
          class="btn nav-item nav-item-next"
        >
          <svg-icon
            name="chevron-right-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </component>
      </li>
      <li role="presentation">
        <component
          :is="isEnd ? 'span' : 'nuxt-link'"
          :to="isEnd ? null : getPageLink(totalPages)"
          :class="{ 'nav-item-disabled': isEnd }"
          :disabled="isEnd"
          aria-label="В конец"
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
  },
  methods: {
    getPageLink(pageNumber) {
      if (pageNumber === 1) return this.$route.path
      return typeof this.linkGen === 'function'
        ? this.linkGen(pageNumber)
        : `${this.$route.path}?page=${pageNumber}`
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-nav {
  & > li {
    flex: 0 1 auto;

    &:first-child {
      .nav-item {
        border-radius: $card-border-radius 0 0 $card-border-radius;
      }
    }

    &:last-child {
      .nav-item {
        border-radius: 0 $card-border-radius $card-border-radius 0;
      }
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem;
    border-radius: 0;
    color: var(--primary-container);
    background-color: var(--primary);

    &:disabled,
    &.nav-item-disabled {
      opacity: 0.25;
    }
  }

  .nav-item-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.375rem 1rem;
    font-family: $font-family-alternate;
    text-align: center;
    color: var(--on-primary);
    background-color: var(--primary);
  }
}
</style>
