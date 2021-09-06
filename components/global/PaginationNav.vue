<template>
  <nav class="pagination">
    <div class="custom-select">
      <select v-model="localPerPage" class="form-control">
        <option v-for="option in pageOptions" :key="`per-page-${option}`" :value="option">{{ option }}</option>
      </select>
    </div>
    <span class="pagination-label"> {{ currentPage }} из&nbsp;{{ numberOfPages }} </span>
    <div class="pagination-buttons">
      <nuxt-link
        :to="{ query: { ...$route.query, page: 1 } }"
        :class="{ disabled: currentPage < 2 }"
        :disabled="currentPage < 2"
        class="btn btn-white btn-icon"
        title="Первая страница"
      >
        <svg-icon name="page-first-24" width="24" height="24" aria-hidden="true" />
      </nuxt-link>
      <nuxt-link
        :to="{ query: { ...$route.query, page: previousPage } }"
        :class="{ disabled: currentPage < 2 }"
        :disabled="currentPage < 2"
        class="btn btn-white btn-icon"
        title="Предыдущая страница"
      >
        <svg-icon name="chevron-left-24" width="24" height="24" aria-hidden="true" />
      </nuxt-link>
      <nuxt-link
        :to="{ query: { ...$route.query, page: nextPage } }"
        :class="{ disabled: currentPage >= numberOfPages }"
        :disabled="currentPage >= numberOfPages"
        class="btn btn-white btn-icon"
        title="Следующая страница"
      >
        <svg-icon name="chevron-right-24" width="24" height="24" aria-hidden="true" />
      </nuxt-link>
      <nuxt-link
        :to="{ query: { ...$route.query, page: numberOfPages } }"
        :class="{ disabled: currentPage >= numberOfPages }"
        :disabled="currentPage >= numberOfPages"
        class="btn btn-white btn-icon"
        title="Последняя страница"
      >
        <svg-icon name="page-last-24" width="24" height="24" aria-hidden="true" />
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    numberOfPages: {
      type: [Number, String],
      default: 1
    },
    pageOptions: {
      type: Array,
      default() {
        return [25, 50, 75, 100]
      }
    },
    perPage: {
      type: [Number, String],
      default: 50
    }
  },
  computed: {
    currentPage() {
      return this.$route.query.page || 1
    },
    nextPage() {
      return parseInt(this.currentPage) + 1
    },
    previousPage() {
      return parseInt(this.currentPage) > 2 ? parseInt(this.currentPage) - 1 : null
    },
    localPerPage: {
      get() {
        return this.perPage
      },
      set(newValue) {
        this.$emit('per-page-changed', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;

  .pagination-label {
    flex: 1 1 auto;
    font-size: $font-size-1;
    white-space: nowrap;
  }

  .pagination-buttons {
    display: flex;
  }

  .custom-select {
    flex: 0 1 auto;
    width: auto;
  }

  .btn {
    padding: 0.5rem;
    border: none;
  }
}

@media (min-width: 992px) {
  .pagination {
    gap: 1.5rem;
  }
}
</style>
