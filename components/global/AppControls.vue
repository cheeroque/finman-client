<template>
  <nav class="app-controls">
    <button class="btn btn-icon" title="Показать боковое меню" @click="$emit('toggle-sidebar')">
      <svg-icon name="menu-24" width="24" height="24" aria-hidden="true" />
    </button>
    <button class="btn btn-icon" title="Поиск" @click="$emit('toggle-search')">
      <svg-icon name="search-24" width="24" height="24" aria-hidden="true" />
    </button>
    <div class="fab">
      <button class="btn btn-icon btn-secondary rounded-pill" title="Добавить запись" @click="$emit('add-record')">
        <svg-icon name="plus-24" width="24" height="24" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.app-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.25rem;
  color: $white;
  background-color: $primary;
  z-index: 999;
}

.fab {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);

  .btn {
    padding: 0.9375rem;
    box-shadow: $box-shadow;

    &:hover {
      box-shadow: $box-shadow-lg;
    }
  }
}

@media (min-width: 992px) {
  .app-controls {
    left: auto;
    right: 3rem;
    bottom: 3rem;
    width: auto;
    padding: 0;
    background-color: transparent;

    & > .btn {
      display: none;
    }

    .fab {
      position: static;
      transform: none;
    }
  }
}
</style>
