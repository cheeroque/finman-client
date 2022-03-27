<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(submit)">
      <FormGroup :label="$t('snapshot.form.balancePrevious.label')">
        <FormInput :value="form.balance_previous" disabled />
      </FormGroup>
      <ValidationProvider
        v-slot="{ valid, validated }"
        name="balance"
        rules="required"
        slim
      >
        <FormGroup
          :label="$t('snapshot.form.balanceCurrent.label')"
          :state="valid || !validated ? null : false"
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
            :label="$t('snapshot.form.dateAndTime.label')"
            :state="valid || !validated ? null : false"
            class="mb-0"
          >
            <FormInputDate
              v-model="form.created_at"
              :placeholder="$t('snapshot.form.dateAndTime.placeholder')"
              :state="valid || !validated ? null : false"
            />
          </FormGroup>
        </ValidationProvider>
        <button type="button" class="btn form-button" @click="setNow">
          {{ $t('snapshot.form.now') }}
        </button>
      </div>
      <FormGroup :label="$t('snapshot.form.note.label')">
        <FormInput
          v-model="form.note"
          :placeholder="$t('snapshot.form.note.placeholder')"
        />
      </FormGroup>
      <div class="d-flex">
        <button type="button" class="btn ms-auto" @click="$emit('close')">
          {{ $t('cancel') }}
        </button>
        <button type="submit" class="btn btn-secondary ms-8">
          {{ $t('save') }}
        </button>
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
        this.$infoToast(this.$t('snapshot.created'), this.$t('success'))
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
