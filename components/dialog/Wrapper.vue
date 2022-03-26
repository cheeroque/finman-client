<template>
  <transition :name="isFullscreen ? 'dialog' : 'dialog-modal'" duration="200">
    <component
      :is="isFullscreen ? 'DialogFullscreen' : 'DialogModal'"
      v-show="dialogVisible"
      :visible="dialogVisible"
      v-bind="dialogProps"
      @close="hideDialog"
    >
      <component
        :is="component"
        :visible="dialogVisible"
        v-bind="componentProps"
        @close="hideDialog"
      />
    </component>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      component: null,
      componentProps: {},
      dialogProps: {},
      dialogVisible: false,
      isFullscreen: false,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'dialog/SHOW_DIALOG') {
        this.showDialog(state.dialog)
      }
    })
  },
  methods: {
    showDialog({ component, componentProps, dialogProps, isFullscreen }) {
      this.component = component
      this.componentProps = componentProps
      this.dialogProps = dialogProps
      this.dialogVisible = true
      this.isFullscreen = isFullscreen
    },
    hideDialog() {
      this.$store.dispatch('dialog/clearDialog')
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal;

  ::v-deep {
    .dialog-content {
      position: relative;
      z-index: 1;
    }

    .dialog-backdrop {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $backdrop-color;
      z-index: 0;
    }
  }
}
</style>
