<template>
  <DialogPage :action-title="actionTitle" :title="dialogTitle">
    <div class="card">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="category"
            rules="required"
          >
            <FormGroup
              :state="valid || !validated ? null : false"
              label="Категория"
            >
              <FormSelect
                v-model="form.category_id"
                :options="categoryOptions"
                :state="valid || !validated ? null : false"
                @input="validateOnInput($event, validate)"
              />
            </FormGroup>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="sum"
            rules="required"
          >
            <FormGroup
              :state="valid || !validated ? null : false"
              label="Сумма"
            >
              <InputGroup append="₽">
                <FormInputCalc
                  v-model="form.sum"
                  :state="valid || !validated ? null : false"
                  @input="validateOnInput($event, validate)"
                />
              </InputGroup>
            </FormGroup>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="note"
            rules="required"
          >
            <FormGroup
              :state="valid || !validated ? null : false"
              label="Комментарий"
            >
              <FormInput
                v-model="form.note"
                :state="valid || !validated ? null : false"
                placeholder="Введите комментарий"
                @input="validateOnInput($event, validate)"
              />
            </FormGroup>
          </ValidationProvider>
          <div class="d-flex g-8 mb-16">
            <ValidationProvider
              v-slot="{ valid, validate, validated }"
              name="color"
              rules="required"
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
                  @input="validateOnInput($event, validate)"
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
            <nuxt-link v-else to="/" class="btn ms-auto">Отменить</nuxt-link>
            <button type="submit" class="btn btn-secondary ms-8">
              {{ actionTitle }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </DialogPage>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    actionTitle() {
      return this.isEdit ? 'Обновить' : 'Сохранить'
    },
    dialogTitle() {
      return this.isEdit ? 'Изменить запись' : 'Создать запись'
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
      return Boolean(this.record?.id)
    },
  },
  created() {
    this.form = cloneDeep(this.record)
  },
  methods: {
    async submit() {
      const action = this.isEdit ? 'updateRecord' : 'storeRecord'
      try {
        await this.$store.dispatch(action, this.form)
        this.$router.push('/')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    async deleteRecord() {
      try {
        await this.$store.dispatch('deleteRecord', this.form.id)
        this.$router.push('/')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    setNow() {
      this.form.created_at = new Date()
    },
    validateOnInput(event, validate) {
      if (event) validate(event)
    },
  },
}
</script>
