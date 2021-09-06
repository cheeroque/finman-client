<template>
  <b-pagination-nav
    :align="align"
    :link-gen="linkGen"
    :number-of-pages="numberOfPages"
    :size="size"
    first-number
    last-number
    use-router
  />
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: null
    },
    numberOfPages: {
      type: [Number, String],
      default: 1
    },
    size: {
      type: String,
      default: null
    }
  },
  methods: {
    linkGen(pageNumber) {
      return pageNumber === 1 ? '?' : { query: { ...this.$route.query, page: pageNumber } }
    }
  }
}
</script>
