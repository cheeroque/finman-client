<template>
  <DialogPage title="Категории">
    <div class="mb-12">
      <CardCategory
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :category="category"
        class="mb-8"
      />
    </div>
    <FloatingButton link="/categories/create" title="Добавить категорию" />
  </DialogPage>
</template>

<script>
export default {
  transition: {
    name: 'page',
    mode: '',
  },
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
