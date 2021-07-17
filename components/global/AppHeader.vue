<template>
  <b-container tag="header" class="app-header d-lg-none" fluid>
    <h1 class="display-3 mb-0">
      <AppTotal />
    </h1>
  </b-container>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: $white;
  background-color: $primary-light;
  background-image: linear-gradient(to bottom right, $primary-light, $primary);
}
</style>
