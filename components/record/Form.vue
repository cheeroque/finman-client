<template>
  <div class="card">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="category"
          rules="required"
          slim
        >
          <FormGroup
            :state="valid || !validated ? null : false"
            label="Категория"
          >
            <FormSelect
              v-model="form.category_id"
              :options="categoryOptions"
              :state="valid || !validated ? null : false"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="sum"
          rules="required"
          slim
        >
          <FormGroup :state="valid || !validated ? null : false" label="Сумма">
            <InputGroup append="₽">
              <FormInputCalc
                v-model="form.sum"
                :state="valid || !validated ? null : false"
              />
            </InputGroup>
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="note"
          rules="required"
          slim
        >
          <FormGroup
            :state="valid || !validated ? null : false"
            label="Комментарий"
          >
            <FormInput
              v-model="form.note"
              :state="valid || !validated ? null : false"
              placeholder="Введите комментарий"
            />
          </FormGroup>
        </ValidationProvider>
        <div class="d-flex g-8 mb-16">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="date"
            rules="required"
            slim
          >
            <FormGroup
              :state="valid || !validated ? null : false"
              label="Дата и время"
              class="mb-0"
            >
              <FormInputDate
                v-model="form.created_at"
                :state="valid || !validated ? null : false"
                placeholder="Выберите дату"
              />
            </FormGroup>
          </ValidationProvider>
          <button type="button" class="btn form-button" @click="setNow">
            Сейчас
          </button>
        </div>
        <div class="d-flex">
          <button
            v-if="isEdit"
            type="button"
            class="btn btn-danger ms-auto"
            @click="deleteRecord"
          >
            Удалить
          </button>
          <button
            v-else
            type="button"
            class="btn ms-auto"
            @click="$emit('close')"
          >
            Отменить
          </button>
          <button type="submit" class="btn btn-secondary ms-8">
            {{ actionTitle }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
      form: {
        category_id: null,
        created_at: new Date(),
        note: null,
        sum: 0,
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['categories']),
    actionTitle() {
      return this.isEdit ? 'Обновить' : 'Сохранить'
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
    isEdit() {
      return Boolean(this.recordId)
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(event) {
        if (event) this.onDialogShown()
        else this.onDialogHidden()
      },
    },
  },
  methods: {
    async fetchRecord() {
      try {
        this.loading = true
        const record = await this.$store.dispatch(
          'fetchRecordById',
          this.recordId
        )
        Object.assign(this.form, record)
        this.loading = false
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
    async submit() {
      const action = this.isEdit ? 'updateRecord' : 'storeRecord'
      try {
        await this.$store.dispatch(action, this.form)
        const message = this.isEdit
          ? `Запись «${this.form.note}» обновлена`
          : 'Запись создана'
        this.$infoToast(message, 'Успех')
        await this.$store.dispatch('fetchRecords', this.$route.query)
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    async deleteRecord() {
      try {
        await this.$store.dispatch('deleteRecord', this.recordId)
        await this.$store.dispatch('fetchRecords', this.$route.query)
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    setNow() {
      this.form.created_at = new Date()
    },
    onDialogShown() {
      if (this.isEdit) this.fetchRecord()
    },
    onDialogHidden() {
      this.$emit('hidden')
    },
  },
}
</script>
