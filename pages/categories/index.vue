<template>
  <PageWrapper>
    <PageHeader> {{ $t('category.categories') }} </PageHeader>
    <main class="categories-list">
      <CategoryCard
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :category="category"
        class="categories-list-item"
      />
    </main>
    <FloatingButton :title="$t('category.add')" @click="createCategory">
      <span class="h5 caption mb-0">{{ $t('category.add') }}</span>
    </FloatingButton>
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PagesCategoriesIndex',
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ store }) {
    await store.dispatch('fetchCategories')
  },
  computed: {
    ...mapGetters(['categories']),
  },
  methods: {
    createCategory() {
      this.$dialogFullscreen(
        'CategoryForm',
        { categoryId: null },
        { title: this.$t('category.create') }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.categories-list {
  margin-bottom: 1rem;
}

.categories-list-item {
  margin-bottom: 0.5rem;
}

::v-deep {
  .btn-fab {
    .caption {
      display: none;
    }
  }
}

@include media-min-width('lg') {
  .categories-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $grid-gap;
  }

  .categories-list-item {
    margin-bottom: 0;
  }
}

@include media-min-width('xl') {
  .categories-list {
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: $grid-gap;
  }

  ::v-deep {
    .btn.btn-fab {
      position: static;
      justify-content: center;
      min-width: calc((100% - $grid-gap * 2) * 0.33333);
      min-height: 5.45rem;
      border-radius: $card-border-radius;

      .caption {
        display: inline-block;
        flex: 0 0 auto;
        max-width: 100%;
        min-width: 0;
        margin-left: 0.5rem;
        font-weight: $font-weight-medium;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
