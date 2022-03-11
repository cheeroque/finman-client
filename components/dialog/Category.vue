<template>
  <DialogPage
    :action-title="actionTitle"
    :title="dialogTitle"
    link-back="/categories"
  >
    <form @submit.prevent="submit">
      <FormGroup label="Имя">
        <FormInput v-model="form.name" placeholder="Введите имя" />
      </FormGroup>
      <FormGroup label="Слаг">
        <FormInput v-model="form.slug" placeholder="Введите слаг" />
      </FormGroup>
      <FormGroup label="Цвет">
        <FormInput v-model="form.color" placeholder="Выберите цвет" />
      </FormGroup>
      <input type="checkbox" />
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
  },
}
</script>
