<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(submit)">
      <FormGroup label="Предыдущий баланс">
        <FormInput :value="form.balance_previous" disabled />
      </FormGroup>
      <ValidationProvider
        v-slot="{ valid, validated }"
        name="balance"
        rules="required"
        slim
      >
        <FormGroup
          :state="valid || !validated ? null : false"
          label="Текущий баланс"
        >
          <InputGroup append="₽">
            <FormInputCalc
              v-model="form.balance"
              :state="valid || !validated ? null : false"
            />
          </InputGroup>
        </FormGroup>
      </ValidationProvider>
      <div class="d-flex g-8 mb-16">
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="date"
          rules="required"
          slim
        >
          <FormGroup
            :state="valid || !validated ? null : false"
            label="Дата и время"
            class="mb-0"
          >
            <FormInputDate
              v-model="form.created_at"
              :state="valid || !validated ? null : false"
              placeholder="Выберите дату"
            />
          </FormGroup>
        </ValidationProvider>
        <button type="button" class="btn form-button" @click="setNow">
          Сейчас
        </button>
      </div>
      <FormGroup label="Примечание">
        <FormInput v-model="form.note" placeholder="Введите примечание" />
      </FormGroup>
      <div class="d-flex">
        <button type="button" class="btn ms-auto" @click="$emit('close')">
          Отменить
        </button>
        <button type="submit" class="btn btn-secondary ms-8">Сохранить</button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    snapshot: {
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
        balance: 0,
        balance_previous: 0,
        created_at: null,
        id: null,
        note: null,
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['total']),
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
    async submit() {
      try {
        await this.$store.dispatch('storeShapshot', this.form)
        this.$infoToast('Снапшот создан', 'Успех')
        await this.$store.dispatch('fetchLatestShapshot')
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    onDialogShown() {
      this.form.balance_previous = this.snapshot.balance
      this.form.balance = this.total
      this.form.created_at = new Date(this.snapshot.created_at)
      this.form.id = this.snapshot.id
      this.form.note = this.snapshot.note
    },
    onDialogHidden() {
      this.$emit('hidden')
    },
    setNow() {
      this.form.created_at = new Date()
    },
  },
}
</script>
