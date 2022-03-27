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
          <FormGroup
            :label="$t('category.form.name.label')"
            :state="valid || !validated ? null : false"
          >
            <FormInput
              v-model="form.name"
              :placeholder="$t('category.form.name.placeholder')"
              :state="valid || !validated ? null : false"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="slug"
          rules="required"
          slim
        >
          <FormGroup
            :label="$t('category.form.slug.label')"
            :state="valid || !validated ? null : false"
          >
            <FormInput
              v-model="form.slug"
              :placeholder="$t('category.form.slug.placeholder')"
              :state="valid || !validated ? null : false"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="color"
          rules="required"
          slim
        >
          <FormGroup
            :label="$t('category.form.color.label')"
            :state="valid || !validated ? null : false"
          >
            <FormInputColor
              v-model="form.color"
              :placeholder="$t('category.form.color.placeholder')"
              :state="valid || !validated ? null : false"
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
          {{ $t('income') }}
        </FormCheckbox>
        <div class="d-flex">
          <button
            v-if="isEdit"
            type="button"
            class="btn btn-danger ms-auto"
            @click="deleteCategory"
          >
            {{ $t('delete') }}
          </button>
          <button
            v-else
            type="button"
            class="btn ms-auto"
            @click="$emit('close')"
          >
            {{ $t('cancel') }}
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
      return this.$t(this.isEdit ? 'update' : 'save')
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
          ? this.$t('category.updated').replace('%s', this.form.name)
          : this.$t('category.created')
        this.$infoToast(message, this.$t('success'))
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
        const message = this.$t('category.deleted').replace(
          '%s',
          this.form.name
        )
        this.$infoToast(message, this.$t('success'))
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    onDialogShown() {
      if (this.isEdit) this.fetchCategory()
      else this.resetForm()
    },
    onDialogHidden() {
      this.$emit('hidden')
    },
    resetForm() {
      this.form = {
        name: null,
        slug: null,
        color: null,
        is_income: false,
      }
    },
  },
}
</script>
