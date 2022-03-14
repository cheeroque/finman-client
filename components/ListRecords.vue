<template>
  <div>
    <CardRecord
      v-for="record in records"
      :key="`record-${record.id}`"
      :display-variant="displayVariant"
      :record="record"
      class="mb-8"
    />
  </div>
</template>

<script>
export default {
  props: {
    displayVariant: {
      type: Boolean,
      default: false,
    },
    records: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
