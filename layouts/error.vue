<template>
  <main class="container container-error">
    <h1 class="error-title">{{ $t('error.error') }} {{ error.statusCode }}</h1>
    <p class="error-message">{{ errorMessage }}</p>
    <p class="error-link">
      <nuxt-link to="/"> {{ $t('error.backToHome') }} </nuxt-link>
    </p>
  </main>
</template>

<script>
export default {
  layout: 'simple',
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: 'container-danger',
      },
    }
  },
  computed: {
    errorMessage() {
      return this.$te(`error.${this.error?.statusCode}`)
        ? this.$t(`error.${this.error?.statusCode}`)
        : this.$t('error.default')
    },
  },
}
</script>

<style lang="scss" scoped>
.container-error {
  padding-top: 4rem;
  padding-bottom: 4rem;
  text-align: center;
}

.error-title {
  margin-bottom: 2rem;
  font-weight: $font-weight-medium;
}

.error-message {
  margin-bottom: 2rem;
  font-size: $font-size-base * 1.25;
}

.error-link {
  text-decoration: underline;
  color: var(--danger);
}
</style>
