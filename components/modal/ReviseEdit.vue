<template>
  <b-modal v-model="localVisible" centered @hide="$emit('hide')">
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <DateTimePicker v-model="localDateTime" :locale="locale" />
      </b-form-group>
      <b-form-group label="Комментарий">
        <b-form-input v-model="form.note" type="text"></b-form-input>
      </b-form-group>

      <b-row>
        <b-col cols="6" offset="6">
          <b-button type="submit" variant="primary" block> Сохранить </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import { BModal, BForm, BFormGroup, BFormInput } from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
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
      form: {
        created_at: null,
        note: null
      },
      locale: 'ru-RU'
    }
  },
  computed: {
    localDateTime: {
      get() {
        return this.form.created_at ? new Date(this.form.created_at) : new Date()
      },
      set(newValue) {
        this.form.created_at = newValue.toISOString()
      }
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
  mounted() {
    this.form = { ...this.item }
  },
  methods: {
    async onSubmit() {
      await this.$axios.$post('revises', this.form).then(() => {
        this.$emit('revise-change')
      })
    }
  }
}
</script>
