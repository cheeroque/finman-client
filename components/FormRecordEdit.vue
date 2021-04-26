<template>
  <b-form @submit.prevent="updateRecord">
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
        <b-button variant="outline-danger" block @click="deleteRecord"> Удалить </b-button>
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
    record: {
      type: Object,
      default() {
        return {}
      }
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    categoryOptions() {
      return this.categories.map((category) => {
        return {
          value: category.id,
          text: category.name
        }
      })
    }
  },
  mounted() {
    this.form = { ...this.record }
  },
  methods: {
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
