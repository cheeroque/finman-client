<template>
  <b-container>
    <form @submit="onSubmit">
      <div>
        <input v-model="form.name" type="text" required />
      </div>
      <div>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <input v-model="form.password" type="password" required />
      </div>
      <div>
        <input v-model="form.password_confirmation" type="password" required />
      </div>
      <b-button type="submit"> Войти </b-button>
    </form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$axios.$post('register', this.form).then(() => {
        this.$emit('change')
      })
    }
  }
}
</script>
