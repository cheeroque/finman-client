<template>
  <PageWrapper :widgets="['Chart', 'Categories']">
    <PageHeader> {{ $t('calendar') }} </PageHeader>
    <MonthCalendar
      :start-date="firstRecord && firstRecord.created_at"
      class="mb-12"
    />
  </PageWrapper>
</template>

<script>
export default {
  name: 'PagesMonthsIndex',
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ store, error }) {
    try {
      const firstRecord = await store.dispatch('fetchFirstRecord')
      return { firstRecord }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .page-content {
    @include media-min-width('md') {
      .calendar-month-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @include media-min-width('xl') {
      .calendar-month-grid {
        gap: $grid-gap * 0.5;
      }
    }
  }
}
</style>
