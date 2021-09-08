<template>
  <f-modal v-model="localVisible" :title="`${create ? 'Создать' : 'Редактировать'} запись`" @show="onShow">
    <form @submit.prevent>
      <f-form-group label="Категория" label-for="record-edit-category">
        <f-select id="record-edit-category" v-model="categoryId" :options="categoryOptions" />
      </f-form-group>
      <f-form-group label="Сумма" label-for="record-edit-sum">
        <f-input id="record-edit-sum" v-model="sum" type="number" />
      </f-form-group>
      <f-form-group label="Комментарий" label-for="record-edit-note">
        <f-input id="record-edit-note" v-model="note" type="text" />
      </f-form-group>
      <f-form-group label="Дата и время" label-for="record-edit-datetime" class="mb-0">
        <f-datepicker id="record-edit-datetime" v-model="createdAt" />
      </f-form-group>
    </form>
    <template #modal-footer="{ close }">
      <button v-if="create" class="btn btn-gray-300 w-lg-40" title="Отмена" aria-label="Отмена" @click="close">
        Отмена
      </button>
      <button v-else class="btn btn-danger w-lg-40" title="Удалить" aria-label="Удалить" @click="deleteRecord(close)">
        Удалить
      </button>
      <button
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
      categoryId: null,
      createdAt: null,
      note: null,
      sum: 0
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    categoryOptions() {
      const categories =
        this.categories && this.categories.length
          ? this.categories.map((category) => {
              return {
                value: category.id,
                text: category.name
              }
            })
          : []
      if (this.create) {
        categories.unshift({ value: null, text: 'Выберите категорию', disabled: true })
      }
      return categories
    },
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  watch: {
    item(value) {
      this.initData(value)
    }
  },
  methods: {
    initData(item) {
      this.categoryId = item.category_id
      this.createdAt = item.created_at ? new Date(item.created_at) : new Date()
      this.note = item.note
      this.sum = item.sum
    },
    onShow() {
      this.initData(this.item)
    },
    async deleteRecord(callback) {
      await this.$axios.$delete(`records/${this.item.id}`)
      this.$store.dispatch('fetchRecords', this.$route.query)
      this.$store.dispatch('fetchTotal')
      callback()
    },
    async onSubmit(callback) {
      const data = {
        category_id: this.categoryId,
        created_at: this.createdAt.toISOString(),
        note: this.note,
        sum: this.sum
      }
      if (this.create) {
        await this.$axios.$post('records', data)
      } else {
        await this.$axios.$put(`records/${this.item.id}`, data)
      }
      this.$store.dispatch('fetchRecords', this.$route.query)
      this.$store.dispatch('fetchTotal')
      callback()
    }
  }
}
</script>
