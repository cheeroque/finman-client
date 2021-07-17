<template>
  <div class="app-controls">
    <b-row>
      <b-col cols="auto" class="d-lg-none">
        <b-button variant="white" block @click="$emit('toggle-sidebar')"> &gt; </b-button>
      </b-col>
      <b-col>
        <b-button variant="secondary" block @click="modalShow = true"> Добавить </b-button>
      </b-col>
    </b-row>
    <ModalRecordEdit v-model="modalShow" @record-change="$root.$emit('refresh-records')" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem $grid-gutter-width / 2;
  background-color: $white;
  box-shadow: $box-shadow;
  z-index: calc(#{$zindex-fixed} + 4);
}

@include media-breakpoint-up(lg) {
  .app-controls {
    bottom: 2rem;
    right: 3rem;
    left: auto;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
