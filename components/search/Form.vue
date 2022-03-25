<template>
  <form @submit.prevent="handleSearch">
    <InputGroup class="search-input-group">
      <FormInput v-model="query" type="search" placeholder="Поиск по записям" />
      <template #append>
        <button type="submit" title="Искать" aria-label="Искать" class="btn">
          <svg-icon
            name="search-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
      </template>
    </InputGroup>
  </form>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  mounted() {
    this.query = this.$route.query.q || ''
  },
  methods: {
    handleSearch() {
      if (!this.query) return
      const trimmedQuery = this.query.toString().trim()
      if (!trimmedQuery.length) {
        this.query = ''
        return
      }
      this.$router.push(`/search?q=${trimmedQuery}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input-group {
  ::v-deep {
    .form-control {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      border-radius: 99rem;
      border: none;
      background-image: none;
    }

    .input-group-append {
      right: 0;
      top: 0;
      bottom: 0;
      padding: 0;

      .btn {
        height: 100%;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border: none;
      }
    }
  }
}
</style>
