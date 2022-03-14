<template>
  <DialogPage
    :action-title="actionTitle"
    :title="dialogTitle"
    link-back="/categories"
  >
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider
          v-slot="{ valid, validate, validated }"
          name="name"
          rules="required"
        >
          <FormGroup label="Имя" :state="valid || !validated ? null : false">
            <FormInput
              v-model="form.name"
              :state="valid || !validated ? null : false"
              placeholder="Введите имя"
              @input="validateOnInput($event, validate)"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validate, validated }"
          name="slug"
          rules="required"
        >
          <FormGroup label="Слаг" :state="valid || !validated ? null : false">
            <FormInput
              v-model="form.slug"
              :state="valid || !validated ? null : false"
              placeholder="Введите слаг"
              @input="validateOnInput($event, validate)"
            />
          </FormGroup>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ valid, validate, validated }"
          name="color"
          rules="required"
        >
          <FormGroup label="Цвет" :state="valid || !validated ? null : false">
            <FormInputColor
              v-model="form.color"
              :state="valid || !validated ? null : false"
              placeholder="Выберите цвет"
              @input="validateOnInput($event, validate)"
            />
          </FormGroup>
        </ValidationProvider>
        <FormCheckbox
          v-model="form.is_income"
          :value="1"
          :unchecked-value="0"
          class="mb-16"
          switch
        >
          Доход
        </FormCheckbox>
        <div class="dialog-footer">
          <button
            v-if="isEdit"
            type="button"
            class="btn btn-danger"
            @click="deleteCategory"
          >
            Удалить
          </button>
          <nuxt-link v-else to="/categories" class="btn">Отменить</nuxt-link>
          <button type="submit" class="btn btn-secondary">
            {{ actionTitle }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </DialogPage>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    category: {
      type: Object,
      default() {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default: false,
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
      return this.isEdit ? 'Изменить категорию' : 'Создать категорию'
    },
    isEdit() {
      return Boolean(this.category?.id)
    },
  },
  created() {
    this.form = cloneDeep(this.category)
  },
  methods: {
    async submit() {
      const action = this.isEdit ? 'updateCategory' : 'storeCategory'
      try {
        await this.$store.dispatch(action, this.form)
        this.$router.push('/categories')
      } catch (error) {
        console.log(`error toast: ${error}`)
      }
    },
    async deleteCategory() {
      try {
        await this.$store.dispatch('deleteCategory', this.form.id)
        this.$router.push('/categories')
      } catch (error) {
        console.log(`error toast: ${error}`)
      }
    },
    validateOnInput(event, validate) {
      if (event) validate(event)
    },
  },
}
</script>
