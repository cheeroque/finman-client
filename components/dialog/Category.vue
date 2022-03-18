<template>
  <DialogPage :action-title="actionTitle" :title="dialogTitle">
    <div class="card">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="name"
            rules="required"
            slim
          >
            <FormGroup :state="valid || !validated ? null : false" label="Имя">
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
            slim
          >
            <FormGroup :state="valid || !validated ? null : false" label="Слаг">
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
            slim
          >
            <FormGroup :state="valid || !validated ? null : false" label="Цвет">
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
          <div class="d-flex">
            <button
              v-if="isEdit"
              type="button"
              class="btn btn-danger ms-auto"
              @click="deleteCategory"
            >
              Удалить
            </button>
            <nuxt-link v-else to="/categories" class="btn ms-auto">
              Отменить
            </nuxt-link>
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
        this.$errorToast(error)
      }
    },
    async deleteCategory() {
      try {
        await this.$store.dispatch('deleteCategory', this.form.id)
        this.$router.push('/categories')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    validateOnInput(event, validate) {
      if (event) validate(event)
    },
  },
}
</script>
