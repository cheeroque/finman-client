<template>
  <f-modal v-model="localVisible" :title="`${create ? 'Создать' : 'Редактировать'} категорию`" @show="onShow">
    <form @submit.prevent>
      <f-form-group label="Имя" label-for="category-edit-name">
        <f-input id="category-edit-name" v-model="name" type="text" required />
      </f-form-group>
      <f-form-group label="Слаг" label-for="category-edit-slug">
        <f-input id="category-edit-slug" v-model="slug" type="text" required />
      </f-form-group>
      <f-form-group label="Цвет" label-for="category-edit-color">
        <f-color id="category-edit-color" v-model="color" />
      </f-form-group>
      <f-checkbox id="category-edit-is-income" v-model="isIncome"> Доход </f-checkbox>
    </form>
    <template #modal-footer="{ close }">
      <button v-if="create" class="btn btn-gray-300 w-lg-40" title="Отмена" aria-label="Отмена" @click="close">
        Отмена
      </button>
      <button v-else class="btn btn-danger w-lg-40" title="Удалить" aria-label="Удалить" @click="deleteCategory(close)">
        Удалить
      </button>
      <button
        :disabled="!isFormValid"
        class="btn btn-primary w-lg-40 ms-lg-auto"
        title="Сохранить"
        aria-label="Сохранить"
        @click="onSubmit(close)"
      >
        Сохранить
      </button>
    </template>
  </f-modal>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    create: {
      type: Boolean,
      default() {
        return false
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      name: null,
      slug: null,
      color: null,
      isIncome: false
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    },
    isFormValid() {
      return !!this.name && !!this.slug
    }
  },
  watch: {
    item(value) {
      this.initData(value)
    }
  },
  methods: {
    initData(item) {
      this.name = item.name
      this.slug = item.slug
      this.color = item.color
      this.isIncome = item.is_income
    },
    onShow() {
      this.initData(this.item)
    },
    refresh() {
      this.$store.dispatch('fetchCategories')
    },
    async deleteCategory(callback) {
      await this.$axios.$delete(`categories/${this.item.id}`)
      this.refresh()
      callback()
    },
    async onSubmit(callback) {
      if (this.isFormValid) {
        const data = {
          name: this.name,
          slug: this.slug,
          color: this.color,
          is_income: this.isIncome
        }
        if (this.create) {
          await this.$axios.$post('categories', data)
        } else {
          await this.$axios.$put(`categories/${this.item.id}`, data)
        }
        this.refresh()
        callback()
      }
    }
  }
}
</script>
