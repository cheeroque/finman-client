<template>
  <DialogCategory :category="category" :loading="loading" />
</template>

<script>
export default {
  transition: {
    name: 'dialog-page',
  },
  data() {
    return {
      loading: false,
      category: {
        color: null,
        is_income: 0,
        name: null,
        slug: null,
      },
    }
  },
}
</script>
