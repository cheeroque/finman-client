<template>
  <transition :duration="transitionDuration" name="collapse">
    <div
      v-show="open"
      :style="{ height: collapseHeight, transitionDuration: `${transitionDuration / 1000}s` }"
      class="collapse"
    >
      <div ref="collapseContent">
        <slot :close="closeCollapse"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'open',
    event: 'change'
  },
  props: {
    open: {
      type: Boolean,
      default() {
        return false
      }
    },
    transitionDuration: {
      type: [Number, String],
      default: 200
    }
  },
  data() {
    return {
      collapseHeight: null
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(value) {
        if (value) this.openCollapse()
        else this.closeCollapse()
      }
    }
  },
  methods: {
    openCollapse() {
      this.$nextTick(() => {
        const collapseContent = this.$refs.collapseContent
        if (collapseContent) {
          const contentHeight = collapseContent.scrollHeight
          this.collapseHeight = `${contentHeight}px`
        }
      })
    },
    closeCollapse() {
      this.collapseHeight = null
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  overflow: hidden;
  height: 0;
}

.collapse-enter-active,
.collapse-leave-active {
  transition-property: height;
  transition-timing-function: ease-in;
}
</style>
