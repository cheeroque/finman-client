<template>
  <div
    ref="collapse"
    :style="{ '--transition-duration': transitionDuration }"
    class="collapse"
  >
    <div ref="content" class="collapse-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrameworkCollapse',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    transitionDuration: {
      type: String,
      default: '200ms',
    },
  },
  watch: {
    open: {
      immediate: true,
      handler(value) {
        if (value) this.onCollapseOpen()
        else this.onCollapseClose()
      },
    },
  },
  methods: {
    onCollapseClose() {
      if (!this.$refs.collapse) return
      this.$emit('close')
      this.$refs.collapse.addEventListener(
        'transitionend',
        this.onCollapseClosed
      )
      this.$refs.collapse.style.height = null
    },
    onCollapseClosed() {
      this.$emit('closed')
      this.$refs.collapse.removeEventListener(
        'transitionend',
        this.onCollapseClosed
      )
    },
    onCollapseOpen() {
      if (!this.$refs.collapse || !this.$refs.content) return
      this.$emit('open')
      this.$refs.collapse.addEventListener(
        'transitionend',
        this.onCollapseOpened
      )
      const contentHeight = this.$refs.content.scrollHeight
      this.$refs.collapse.style.height = `${contentHeight}px`
    },
    onCollapseOpened() {
      this.$emit('opened')
      this.$refs.collapse.removeEventListener(
        'transitionend',
        this.onCollapseOpened
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse {
  height: 0;
  overflow: hidden;
  transition-property: height;
  transition-duration: var(--transition-duration);
  transition-timing-function: linear;
}
</style>
