<template>
  <header class="app-header" fluid>
    <div class="row align-end">
      <div class="col-12 col-lg-3">
        <AppTotal />
      </div>
      <div class="col-12 col-lg-9">
        <AppMonthly />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  padding: 1.5rem 1rem;
}

@media (min-width: 992px) {
  .app-header {
    padding: 1.5rem 0;
  }
}
</style>
