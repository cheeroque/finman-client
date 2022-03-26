<template>
  <DialogRecord :categories="categories" :record="record" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  data() {
    return {
      record: {
        category_id: null,
        created_at: new Date(),
        id: null,
        note: null,
        sum: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['categories']),
  },
}
</script>
