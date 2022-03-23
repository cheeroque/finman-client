<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">Календарь</h5>
    </div>
    <MonthCalendar start-date="2016-01-01" />
  </div>
</template>

<style lang="scss" scoped>
.card-widget {
  ::v-deep {
    .card-calendar {
      border-radius: 0.25rem;

      .card-header {
        padding-left: 0;
        padding-right: 0;
      }

      .calendar-years-slider {
        .card-body {
          padding: 0;
        }
      }
    }
  }
}
</style>
