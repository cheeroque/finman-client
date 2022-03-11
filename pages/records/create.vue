<template>
  <DialogPage action-title="Сохранить" title="Создать запись">
    <form @submit.prevent="submit">
      <FormGroup label="Категория">
        <FormSelect v-model="record.category_id" :options="categoryOptions" />
      </FormGroup>
      <FormGroup label="Сумма">
        <InputGroup append="₽">
          <input
            ref="sumInput"
            :value="record.sum"
            class="form-control"
            @blur="updateSum"
            @input.prevent="filterValue"
          />
        </InputGroup>
      </FormGroup>
      <FormGroup label="Комментарий">
        <FormInput v-model="record.note" placeholder="Введите комментарий" />
      </FormGroup>
      <div class="d-flex g-8 mb-16">
        <FormGroup label="Дата и время" class="mb-0">
          <FormInputDate
            v-model="record.created_at"
            placeholder="Выберите дату"
          />
        </FormGroup>
        <button type="button" class="btn form-button" @click="setNow">
          Сейчас
        </button>
      </div>
      <div class="dialog-footer">
        <nuxt-link to="/" class="btn">Отменить</nuxt-link>
        <button type="submit" class="btn dialog-submit">Сохранить</button>
      </div>
    </form>
  </DialogPage>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'dialog-page',
  },
  data() {
    return {
      loading: false,
      record: {
        category_id: null,
        created_at: new Date(),
        id: null,
        note: null,
        sum: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['categories']),
    categoryOptions() {
      const options = [
        { value: null, text: 'Категория не выбрана', disabled: true },
      ]
      this.categories?.forEach(({ id, name }) =>
        options.push({ value: id, text: name })
      )
      return options
    },
  },
  methods: {
    async submit() {
      this.updateSum({ target: this.$refs.sumInput })
      this.loading = true
      try {
        await this.$axios.$post(`/records`, this.record)
        this.loading = false
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    filterValue({ target }) {
      const pattern = /[^\d+-]/
      const filteredValue = `${target.value}`.replace(pattern, '')
      target.value = filteredValue || 0
    },
    updateSum({ target }) {
      const matches = target.value.match(/([+-]{0,}\d{1,})/gi) || []
      const total = matches.reduce((total, match) => {
        total += parseInt(match)
        return total
      }, 0)
      this.record.sum = total
    },
    setNow() {
      this.record.created_at = new Date()
    },
  },
}
</script>
