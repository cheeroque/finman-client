<template>
  <div class="card">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="category"
          rules="required"
          slim
        >
          <FormGroup
            :state="valid || !validated ? null : false"
            :label="$t('category.category')"
          >
            <FormSelect
              v-model="form.category_id"
              :options="categoryOptions"
              :state="valid || !validated ? null : false"
            />
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="sum"
          rules="required"
          slim
        >
          <FormGroup
            :label="$t('record.form.sum.label')"
            :state="valid || !validated ? null : false"
          >
            <InputGroup append="₽">
              <FormInputCalc
                v-model="form.sum"
                :state="valid || !validated ? null : false"
              />
            </InputGroup>
          </FormGroup>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="note"
          rules="required"
          slim
        >
          <FormGroup
            :label="$t('record.form.note.label')"
            :state="valid || !validated ? null : false"
          >
            <FormInput
              v-model="form.note"
              :placeholder="$t('record.form.note.placeholder')"
              :state="valid || !validated ? null : false"
            />
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
              :label="$t('record.form.dateAndTime.label')"
              :state="valid || !validated ? null : false"
              class="mb-0"
            >
              <FormInputDate
                v-model="form.created_at"
                :placeholder="$t('record.form.dateAndTime.placeholder')"
                :state="valid || !validated ? null : false"
              />
            </FormGroup>
          </ValidationProvider>
          <button type="button" class="btn form-button" @click="setNow">
            {{ $t('record.form.now') }}
          </button>
        </div>
        <div class="d-flex">
          <button
            v-if="isEdit"
            type="button"
            class="btn btn-danger ms-auto"
            @click="deleteRecord"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    record: {
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
        category_id: null,
        created_at: new Date(),
        note: null,
        sum: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['categories']),
    actionTitle() {
      return this.$t(this.isEdit ? 'update' : 'save')
    },
    categoryOptions() {
      const options = [
        {
          value: null,
          text: this.$t('category.categoryNotSelected'),
          disabled: true,
        },
      ]
      this.categories?.forEach(({ id, name }) =>
        options.push({ value: id, text: name })
      )
      return options
    },
    isEdit() {
      return Boolean(this.record?.id)
    },
  },
  created() {
    this.initForm()
  },
  methods: {
    ...mapActions(['fetchCurrentMonthRecords', 'fetchRecords', 'fetchTotal']),
    async submit() {
      const action = this.isEdit ? 'updateRecord' : 'storeRecord'
      try {
        await this.$store.dispatch(action, this.form)
        const message = this.isEdit
          ? this.$t('record.updated').replace('%s', this.form.note)
          : this.$t('record.created')
        this.$infoToast(message, this.$t('success'))
        await this.updateRecordsData()
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    async deleteRecord() {
      try {
        await this.$store.dispatch('deleteRecord', this.record?.id)
        await this.updateRecordsData()
        const message = this.$t('record.deleted').replace('%s', this.form.note)
        this.$infoToast(message, this.$t('success'))
        this.$emit('close')
      } catch (error) {
        this.$errorToast(error)
      }
    },
    async updateRecordsData() {
      await this.fetchTotal()
      await this.fetchRecords(this.$route.query)
      await this.fetchCurrentMonthRecords()
    },
    async initForm() {
      if (!this.categories?.length) {
        await this.$store.dispatch('fetchCategories')
      }
      const firstCategory = this.categoryOptions.find(({ value }) =>
        Boolean(value)
      )
      const record = {
        ...this.record,
        created_at: new Date(this.record?.created_at),
      }
      const formDefaults = {
        category_id: firstCategory.value,
        created_at: new Date(),
        note: null,
        sum: 0,
      }
      Object.assign(this.form, this.isEdit ? record : formDefaults)
    },
    setNow() {
      this.form.created_at = new Date()
    },
  },
}
</script>
