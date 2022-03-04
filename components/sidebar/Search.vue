<template>
  <SearchForm input-size="lg" class="form-search-sidebar" hide-button />
</template>

<style lang="scss" scoped>
.form-search-sidebar {
  margin-bottom: 1.875rem;
  padding: 0 1rem;

  ::v-deep {
    .form-control {
      border-color: transparent;
      border-right-width: 0;
      border-left-width: 0;
      border-bottom-color: rgba($white, 0.5);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-color: rgba($white, 0.1);

      &::placeholder {
        color: rgba($white, 0.5);
      }

      &:not(:disabled):not(.disabled) {
        &:focus,
        &.focus {
          border-color: transparent;
          border-bottom-color: rgba($white, 1);
          background-color: rgba($white, 0.15);
        }
      }
    }
  }
}
</style>
