<template>
  <DialogPage :action-title="actionTitle" :title="dialogTitle">
    <div class="card">
      <form @submit.prevent="submit">
        <FormGroup label="Категория">
          <FormSelect v-model="form.category_id" :options="categoryOptions" />
        </FormGroup>
        <FormGroup label="Сумма">
          <InputGroup append="₽">
            <FormInputCalc v-model="form.sum" />
          </InputGroup>
        </FormGroup>
        <FormGroup label="Комментарий">
          <FormInput v-model="form.note" placeholder="Введите комментарий" />
        </FormGroup>
        <div class="d-flex g-8 mb-16">
          <FormGroup label="Дата и время" class="mb-0">
            <FormInputDate
              v-model="form.created_at"
              placeholder="Выберите дату"
            />
          </FormGroup>
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
  },
}
</script>
