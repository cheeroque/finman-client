<template>
  <li role="presentation">
    <hr class="nav-item-divider" />
  </li>
</template>

<style lang="scss" scoped>
.nav-item-divider {
  width: auto;
  margin: ($drawer-item-padding-y * 0.5) $drawer-item-padding-x;
}

@include media-min-width('md') {
  .nav-item-divider {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
  }
}
</style>
