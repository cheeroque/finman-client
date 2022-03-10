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
        <InputGroup append="₽">
          <input
            ref="sumInput"
            :value="record.sum"
            class="form-control"
            @blur="updateSum"
            @input.prevent="filterValue"
          />
        </InputGroup>
      </FormGroup>
      <FormGroup label="Комментарий">
        <FormInput v-model="record.note" placeholder="Введите комментарий" />
      </FormGroup>
      <div class="d-flex g-8 mb-24">
        <FormGroup label="Дата и время" class="mb-0">
          <FormInputDate
            v-model="record.created_at"
            placeholder="Выберите дату"
          />
        </FormGroup>
        <button type="button" class="btn form-button" @click="setNow">
          Сейчас
        </button>
      </div>
      <div class="dialog-footer">
        <button type="button" class="btn" @click="cancel">Отменить</button>
        <button type="submit" class="btn dialog-submit">Сохранить</button>
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
      const options = [
        { value: null, text: 'Категория не выбрана', disabled: true },
      ]
      this.categories?.forEach(({ id, name }) =>
        options.push({ value: id, text: name })
      )
      return options
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
    filterValue({ target }) {
      const pattern = /[^\d+-]/
      const filteredValue = `${target.value}`.replace(pattern, '')
      target.value = filteredValue || 0
    },
    updateSum({ target }) {
      const matches = target.value.match(/([+-]{0,}\d{1,})/gi) || []
      const total = matches.reduce((total, match) => {
        total += parseInt(match)
        return total
      }, 0)
      this.record.sum = total
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
      this.updateSum({ target: this.$refs.sumInput })
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
