<template>
  <DialogFullscreen
    v-model="localVisible"
    :action-title="dialogActionTitle"
    :title="dialogTitle"
    @action="submit"
    @show="initRecord"
  >
    <template #default="{ cancel }">
      <form @submit.prevent="submit">
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
        <div class="d-flex g-8 mb-16">
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
    </template>
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
  methods: {
    ...mapActions(['fetchRecordById', 'fetchRecords']),
    async submit() {
      this.updateSum({ target: this.$refs.sumInput })
      this.loading = true
      if (!this.recordId) {
        await this.storeRecord()
      } else {
        await this.updateRecord()
      }
      await this.fetchRecords(this.$route.query)
      this.loading = false
    },
    async getRecord() {
      this.loading = true
      this.record = await this.fetchRecordById(this.recordId)
      this.loading = false
    },
    async initRecord() {
      if (!this.recordId) {
        this.record = {
          category_id: null,
          created_at: new Date(),
          id: null,
          note: null,
          sum: 0,
        }
      } else {
        await this.getRecord()
      }
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
    setNow() {
      this.record.created_at = new Date()
    },
  },
}
</script>
