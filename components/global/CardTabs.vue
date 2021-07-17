<template>
  <b-card header-tag="nav" no-body>
    <template #header>
      <b-nav card-header tabs justified>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
          :to="{ query: tab.value ? { show: tab.value } : null }"
          :active="tab.value === active"
        >
          <svg-icon :name="`show-${tab.value || 'all'}-24`" width="24" height="24" aria-hidden="true" />
          {{ tab.text }}
        </b-nav-item>
      </b-nav>
    </template>
    <b-card-body>
      <slot></slot>
    </b-card-body>
    <b-card-footer>
      <slot name="footer"></slot>
    </b-card-footer>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BCardFooter, BNav, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardFooter,
    BNav,
    BNavItem
  },
  props: {
    active: {
      type: String,
      default: null
    },
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    activeTab() {
      return this.tabs.find((tab) => tab.value === this.active) || {}
    }
  }
}
</script>
