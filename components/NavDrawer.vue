<template>
  <div>
    <transition name="drawer">
      <nav v-if="visible" class="nav-drawer">
        <ul class="nav nav-drawer-nav">
          <li role="presentation">
            <p class="nav-item-header h5">Меню</p>
          </li>
          <li role="presentation">
            <nuxt-link to="/" class="nav-item">
              <svg-icon
                name="home-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
              Главная страница
            </nuxt-link>
          </li>
          <li role="presentation">
            <nuxt-link to="/categories" class="nav-item">
              <svg-icon
                name="categories-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
              Категории
            </nuxt-link>
          </li>
          <li role="presentation">
            <nuxt-link to="/users" class="nav-item">
              <svg-icon
                name="user-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
              Пользователи
            </nuxt-link>
          </li>
          <li role="presentation">
            <a href="#" class="nav-item" @click="$emit('export')">
              <svg-icon
                name="export-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
              Экспорт данных
            </a>
          </li>
          <li role="presentation">
            <p class="nav-item-header h5">Дата сверки</p>
          </li>
          <li role="presentation">
            <a href="#" class="nav-item" @click="$emit('revise-show')">
              <svg-icon
                name="datetime-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
              дата
            </a>
          </li>
        </ul>
        <button
          title="Закрыть меню"
          aria-label="Закрыть меню"
          class="btn btn-drawer-close"
          @click="$emit('close')"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </nav>
    </transition>
    <transition name="drawer-backdrop">
      <div
        v-if="visible"
        class="nav-drawer-backdrop"
        aria-hidden="true"
        @click="$emit('close')"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 90%;
  padding: $nav-drawer-padding-y $nav-drawer-padding-x;
  border-radius: 0 1rem 1rem 0;
  color: var(--drawer-color);
  background-color: var(--drawer-bg);
  overflow-y: auto;
  z-index: 1010;
}

.nav-drawer-nav {
  flex-direction: column;

  & > * {
    flex: 0 0 auto;
  }

  .nav-item-header {
    margin-bottom: 0;
    padding: $nav-drawer-item-padding-y $nav-drawer-item-padding-x;
    font-weight: $font-weight-medium;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: $nav-drawer-item-padding-y $nav-drawer-item-padding-x;
    border-radius: 99rem;

    .icon {
      margin-right: 0.5rem;
    }

    &.active {
      color: var(--drawer-active-color);
      background-color: var(--drawer-active-bg);
    }
  }
}

.nav-drawer-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($black, 0.75);
  cursor: pointer;
  z-index: 1009;
}

.btn-drawer-close {
  position: absolute;
  left: $nav-drawer-padding-x;
  bottom: 1.5rem;
  padding: $nav-drawer-item-padding-y $nav-drawer-item-padding-x;
  border: none;
}
</style>
