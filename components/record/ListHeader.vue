<template>
  <div class="records-list-header">
    <PageHeaderMain />
    <RecordListTabs />
  </div>
</template>

<style lang="scss" scoped>
@include media-max-width('md') {
  ::v-deep {
    .records-tabs {
      display: none;
    }
  }
}

@include media-min-width('md') {
  .records-list-header {
    position: relative;
    padding: 1rem;

    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: $border-width;
      background-color: var(--outline);
      opacity: 0.2;
    }
  }
}

@include media-min-width('xl') {
  .records-list-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem $grid-gap;
    padding: 1rem $grid-gap;

    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: $border-width;
      background-color: var(--outline);
      opacity: 0.2;
    }

    ::v-deep {
      .records-tabs {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
