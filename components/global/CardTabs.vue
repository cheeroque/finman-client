<template>
  <b-card header-tag="nav" no-body>
    <template #header>
      <b-nav class="d-none d-lg-flex" card-header tabs>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
          :to="{ query: tab.value ? { show: tab.value } : null }"
          :active="tab.value === value"
        >
          {{ tab.text }}
        </b-nav-item>
      </b-nav>
      <b-dropdown :text="activeTab.text" class="d-lg-none">
        <b-dropdown-item
          v-for="(tab, index) in tabs"
          :key="`dropdown-item-${index}`"
          :to="{ query: tab.value ? { show: tab.value } : null }"
        >
          {{ tab.text }}
        </b-dropdown-item>
      </b-dropdown>
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
import { BCard, BCardBody, BCardFooter, BNav, BNavItem, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardFooter,
    BNav,
    BNavItem,
    BDropdown,
    BDropdownItem
  },
  props: {
    value: {
      type: String,
      default: ''
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
      return this.tabs.find((tab) => tab.value === this.value) || {}
    }
  }
}
</script>
