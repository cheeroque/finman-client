<template>
  <div class="card record-card-empty">
    <p class="record-note">Нет&nbsp;данных для&nbsp;отображения.</p>
  </div>
</template>

<style lang="scss" scoped>
.record-card-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-base * 0.875;
  text-align: center;
  color: var(--outline);

  p {
    margin-bottom: 0;
    line-height: $line-height-heading;
  }
}
</style>
