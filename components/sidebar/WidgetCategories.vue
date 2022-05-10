<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">{{ $t('category.categories') }}</h5>
    </div>
    <div v-if="categories && categories.length" class="card-body">
      <CategorySimpleCard
        v-for="category in categories"
        :key="`category-${category.id}`"
        :category="category"
      />
    </div>
    <p v-else class="widget-empty">
      {{ $t('nothingToDisplay') }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('fetchCategories')
  },
  computed: {
    ...mapGetters(['categories']),
  },
}
</script>

<style lang="scss" scoped>
.card-widget {
  .card-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $grid-gap * 0.5;
  }
}
</style>
