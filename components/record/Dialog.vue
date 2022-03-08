<template>
  <DialogFullscreen
    v-model="localVisible"
    :action-title="dialogActionTitle"
    :title="dialogTitle"
    @action="onFormSubmit"
  >
    <form @submit.prevent="onFormSubmit">
      <FormGroup label="Категория">
        <FormSelect v-model="record.category_id" :options="categoryOptions" />
      </FormGroup>
      <FormGroup label="Сумма">
        <FormInput
          v-model="record.sum"
          append="₽"
          min="0"
          placeholder="0"
          type="number"
        />
      </FormGroup>
      <FormGroup label="Комментарий">
        <FormInput v-model="record.note" placeholder="Введите комментарий" />
      </FormGroup>
      <div class="form-row mb-24">
        <FormGroup label="Дата и время" column-count="2">
          <FormInputDate
            v-model="record.created_at"
            placeholder="Выберите дату"
          />
        </FormGroup>
        <button type="button" class="btn btn-form-control" @click="setNow">
          Сейчас
        </button>
      </div>
      <div class="dialog-controls">
        <button type="button" class="btn" @click="cancel">Отменить</button>
        <button type="submit" class="btn btn-submit">Сохранить</button>
      </div>
    </form>
  </DialogFullscreen>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    ...mapGetters(['categories']),
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
    categoryOptions() {
      return (
        this.categories?.map(({ id, name }) => ({ value: id, text: name })) ||
        []
      )
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
    ...mapActions(['fetchRecordById']),
    async getRecord() {
      this.loading = true
      this.record = await this.fetchRecordById(this.recordId)
      this.loading = false
    },
    async storeRecord() {
      this.loading = true
      await this.$axios.$post(`/records`, this.record)
      this.loading = false
      this.localVisible = false
    },
    async updateRecord() {
      this.loading = true
      await this.$axios.$put(`/records/${this.recordId}`, this.record)
      this.loading = false
      this.localVisible = false
    },
    cancel() {
      this.localVisible = false
    },
    initRecord() {
      if (!this.recordId) {
        this.record = {
          category_id: null,
          created_at: new Date(),
          id: null,
          note: null,
          sum: 0,
        }
      } else {
        this.getRecord()
      }
    },
    onFormSubmit() {
      if (!this.recordId) this.storeRecord()
      else this.updateRecord()
    },
    setNow() {
      this.record.created_at = new Date()
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  .btn {
    color: var(--primary);
  }

  .btn-submit {
    color: var(--on-primary);
    background-color: var(--primary);
  }
}
</style>
