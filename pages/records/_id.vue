<template>
  <DialogRecord :categories="categories" :record="record" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'page',
    mode: '',
  },
  async asyncData({ params, store, error }) {
    try {
      const record = await store.dispatch('fetchRecordById', params.id)
      return { record }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    ...mapGetters(['categories']),
  },
}
</script>
