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
      <CategoryCard
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :category="category"
        class="mb-8"
        @category-edit="editCategory"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    await store.dispatch('fetchCategories')
  },
  data() {
    return {
      categoryId: null,
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters(['categories']),
  },
  methods: {
    editRecord(categoryId) {
      this.categoryId = categoryId
      this.dialogVisible = true
    },
  },
}
</script>
