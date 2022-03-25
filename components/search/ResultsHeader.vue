<template>
  <div class="search-results-header">
    <h1 class="h3 search-results-title">{{ query }}</h1>
    <p class="search-results-found">Найдено {{ total }} записей</p>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: String,
      default: '',
    },
    total: {
      type: [String, Number],
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.search-results-header {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
  color: $header-color;
  background-color: $header-bg;
}

.search-results-title {
  margin-bottom: 0.25rem;
  font-weight: $font-weight-medium;
}

.search-results-found {
  margin-bottom: 0;
  font-family: $font-family-alternate;
  font-size: $font-size-base * 0.875;
  color: var(--primary);
}

@include media-min-width('md') {
  .search-results-header {
    position: relative;
    padding: 1rem;
    text-align: left;

    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: $border-width;
      background-color: var(--outline);
      opacity: 0.2;
    }
  }
}

@include media-min-width('xl') {
  .search-results-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 1rem $grid-gap;
    padding: 1rem $grid-gap;
  }

  .search-results-title {
    flex: 1 1 auto;
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: $font-weight-normal;
  }

  .search-results-found {
    line-height: 1.75;
  }
}
</style>
