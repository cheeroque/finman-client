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
    <b-form-group label="Дата">
      <b-form-input v-model="form.updated_at" type="date"></b-form-input>
    </b-form-group>

    <b-row>
      <b-col cols="6">
        <b-button v-if="!create" variant="outline-danger" block @click="deleteRecord"> Удалить </b-button>
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
    create: {
      type: Boolean,
      default() {
        return false
      }
    },
    record: {
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
        created_at: null,
        updated_at: null
      }
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
      if (this.create) {
        categories.unshift({ value: null, text: 'Выберите категорию', disabled: true })
      }
      return categories
    }
  },
  mounted() {
    if (!this.create) {
      this.form = { ...this.record }
    }
  },
  methods: {
    async onSubmit() {
      if (this.create) {
        await this.createRecord()
      } else {
        await this.updateRecord()
      }
    },
    async createRecord() {
      this.form.created_at = Date.now()
      await this.$http.$post(`${process.env.API_URL}/records`, this.form).then(() => {
        this.$emit('change')
      })
    },
    async updateRecord() {
      await this.$http.$put(`${process.env.API_URL}/records/${this.record.id}`, this.form).then(() => {
        this.$emit('change')
      })
    },
    async deleteRecord() {
      await this.$http.$delete(`${process.env.API_URL}/records/${this.record.id}`).then(() => {
        this.$emit('change')
      })
    }
  }
}
</script>
