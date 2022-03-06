<template>
  <div class="container">
    <HeaderMain />

    <RecordCard v-for="(record, index) in records.data" :key="`record-${index}`" :record="record" />

    <FloatingButton title="Добавить запись" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params, store }) {
    await store.dispatch('fetchRecords', params)
  },
  computed: {
    ...mapGetters(['records']),
  },
}
</script>
