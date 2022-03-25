<template>
  <div class="card">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="name"
          rules="required"
          slim
        >
          <FormGroup :state="valid || !validated ? null : false" label="Имя">
            <FormInput
              v-model="form.name"
              :state="valid || !validated ? null : false"
              placeholder="Введите имя"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="slug"
          rules="required"
          slim
        >
          <FormGroup :state="valid || !validated ? null : false" label="Слаг">
            <FormInput
              v-model="form.slug"
              :state="valid || !validated ? null : false"
              placeholder="Введите слаг"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="color"
          rules="required"
          slim
        >
          <FormGroup :state="valid || !validated ? null : false" label="Цвет">
            <FormInputColor
              v-model="form.color"
              :state="valid || !validated ? null : false"
              placeholder="Выберите цвет"
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
export default {
  props: {
    categoryId: {
      type: Object,
      default() {
        return {}
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: null,
        slug: null,
        color: null,
        is_income: false,
      },
      loading: false,
    }
  },
  computed: {
    actionTitle() {
      return this.isEdit ? 'Обновить' : 'Сохранить'
    },
    isEdit() {
      return Boolean(this.categoryId)
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
    async fetchCategory() {
      try {
        this.loading = true
        const category = await this.$store.dispatch(
          'fetchCategoryById',
          this.categoryId
        )
        Object.assign(this.form, category)
        this.loading = false
      } catch (e) {
        return this.$error({ statusCode: e?.response?.status || 500 })
      }
    },
    async submit() {
      const action = this.isEdit ? 'updateCategory' : 'storeCategory'
      try {
        await this.$store.dispatch(action, this.form)
        const message = this.isEdit
          ? `Категория «${this.form.name}» обновлена`
          : 'Категория создана'
        this.$infoToast(message, 'Успех')
        await this.$store.dispatch('fetchCategories')
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    async deleteCategory() {
      try {
        await this.$store.dispatch('deleteCategory', this.categoryId)
        await this.$store.dispatch('fetchCategories')
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    onDialogShown() {
      if (this.isEdit) this.fetchCategory()
    },
    onDialogHidden() {
      this.$emit('hidden')
    },
  },
}
</script>
