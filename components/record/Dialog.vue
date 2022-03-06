<template>
  <DialogFullscreen
    v-model="localVisible"
    :action-title="dialogActionTitle"
    :title="dialogTitle"
    @action="updateRecord"
  >
    <form @submit.prevent="updateRecord">
      <FormGroup label="Комментарий">
        <FormInput v-model="record.note" placeholder="Введите комментарий" />
      </FormGroup>
      <div class="form-row">
        <FormGroup label="Дата и время" column-count="2">
          <FormInput v-model="record.note" placeholder="Введите комментарий" />
        </FormGroup>
        <button type="button" class="btn btn-form-control">Сейчас</button>
      </div>
    </form>
  </DialogFullscreen>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    recordId: {
      type: [Number, String],
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      record: {},
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('change', value)
      },
    },
    dialogTitle() {
      return this.recordId ? 'Изменить запись' : 'Новая запись'
    },
    dialogActionTitle() {
      return this.recordId ? 'Обновить' : 'Сохранить'
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) this.initRecord()
      },
    },
  },
  methods: {
    async getRecord() {
      this.loading = true
      const record = await this.$axios.$get(`records/${this.recordId}`)
      this.record = record
      this.loading = false
    },
    initRecord() {
      if (!this.recordId) {
        this.record = {
          category_id: null,
          created_at: new Date(),
          id: null,
          note: null,
          sum: 0,
          updated_at: new Date(),
        }
      } else {
        this.getRecord()
      }
    },
    updateRecord() {
      this.localVisible = false
    },
  },
}
</script>
