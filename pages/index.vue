<template>
  <div>
    <HeaderMain />
    <main class="container mb-12">
      <CardRecord
        v-for="(record, index) in records"
        :key="`record-${index}`"
        :record="record"
        class="mb-8"
      />
    </main>
    <FloatingButton link="/records/create" title="Добавить запись" />
  </div>
</template>

<script>
export default {
  async asyncData({ query, store, error }) {
    const order = query.order || 'DESC'
    const orderBy = query.orderBy || 'created_at'
    const perPage = query.perPage || 50
    const show = query.show || null
    try {
      const { data, total } = await store.dispatch('fetchRecords', {
        order,
        orderBy,
        perPage,
        show,
      })
      return {
        order,
        orderBy,
        show,
        perPage,
        records: data,
        totalRows: total,
      }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
}
</script>
