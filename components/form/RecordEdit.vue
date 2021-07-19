<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Категория">
      <b-form-select v-model="form.category_id" :options="categoryOptions"></b-form-select>
    </b-form-group>
    <b-form-group label="Сумма">
      <b-form-input v-model="form.sum" type="number"></b-form-input>
    </b-form-group>
    <b-form-group label="Комментарий">
      <b-form-input v-model="form.note" type="text"></b-form-input>
    </b-form-group>
    <b-form-group>
      <DateTimePicker v-model="localDateTime" :locale="locale" />
    </b-form-group>

    <b-row>
      <b-col cols="6">
        <b-button v-if="!isCreate" variant="outline-danger" block @click="deleteRecord"> Удалить </b-button>
      </b-col>
      <b-col cols="6">
        <b-button type="submit" variant="primary" block> Сохранить </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        category_id: null,
        sum: 0,
        note: null,
        created_at: null
      },
      locale: 'ru-RU'
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    categoryOptions() {
      const categories = this.categories.map((category) => {
        return {
          value: category.id,
          text: category.name
        }
      })
      if (this.isCreate) {
        categories.unshift({ value: null, text: 'Выберите категорию', disabled: true })
      }
      return categories
    },
    isCreate() {
      return !this.item || this.isEmptyObject(this.item)
    },
    localDateTime: {
      get() {
        return this.form.created_at ? new Date(this.form.created_at) : new Date()
      },
      set(newValue) {
        this.form.created_at = newValue.toISOString()
      }
    }
  },
  mounted() {
    if (!this.isCreate) {
      this.form = { ...this.item }
    }
  },
  methods: {
    async onSubmit() {
      if (this.isCreate) {
        await this.createRecord()
      } else {
        await this.updateRecord()
      }
    },
    async createRecord() {
      await this.$axios.$post('records', this.form).then(() => {
        this.$emit('change')
      })
    },
    async updateRecord() {
      await this.$axios.$put(`records/${this.item.id}`, this.form).then(() => {
        this.$emit('change')
      })
    },
    async deleteRecord() {
      await this.$axios.$delete(`records/${this.item.id}`).then(() => {
        this.$emit('change')
      })
    },
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
</script>
