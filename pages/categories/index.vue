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
      <h4 class="dialog-title mb-0">Категории</h4>
    </header>

    <main class="container mb-12">
      <CardCategory
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :category="category"
        class="mb-8"
      />
    </main>
    <FloatingButton link="/categories/create" title="Добавить категорию" />
  </div>
</template>

<script>
export default {
  async asyncData({ store, error }) {
    try {
      const categories = await store.dispatch('fetchCategories')
      return { categories }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
