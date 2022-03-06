<template>
  <div class="container">
    <HeaderMain />
    <RecordCard
      v-for="(record, index) in records.data"
      :key="`record-${index}`"
      :record="record"
      @record-edit="editRecord"
    />
    <RecordDialog v-model="dialogVisible" :record-id="recordId" />
    <FloatingButton title="Добавить запись" @click="editRecord(null)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params, store }) {
    await store.dispatch('fetchRecords', params)
  },
  data() {
    return {
      dialogVisible: false,
      recordId: null,
    }
  },
  computed: {
    ...mapGetters(['records']),
  },
  methods: {
    editRecord(recordId) {
      this.recordId = recordId
      this.dialogVisible = true
    },
  },
}
</script>
