<template>
  <transition name="dialog-fullscreen" duration="200">
    <DialogFullscreen
      v-show="dialogVisible"
      :visible="dialogVisible"
      v-bind="dialogProps"
      @close="hideDialog"
    >
      <component
        :is="component"
        :visible="dialogVisible"
        v-bind="componentProps"
      />
    </DialogFullscreen>
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
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'dialog/SHOW_DIALOG' && state.dialog.isFullscreen) {
        this.showDialog(state.dialog)
      }
    })
  },
  methods: {
    showDialog({ component, componentProps, dialogProps }) {
      this.component = component
      this.componentProps = componentProps
      this.dialogProps = dialogProps
      this.dialogVisible = true
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
}

.dialog-modal {
  .dialog-content {
    position: relative;
    border-radius: $dialog-border-radius;
  }
}

.dialog-body {
  padding: 0 $dialog-padding-x $dialog-padding-y;
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 $dialog-padding-x $dialog-padding-y;

  & > * + * {
    margin-left: 0.5rem;
  }
}
</style>
