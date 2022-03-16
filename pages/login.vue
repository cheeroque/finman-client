<template>
  <main class="container py-24">
    <h1 class="mb-24">Авторизация</h1>
    <form @submit.prevent="onSubmit">
      <FormGroup label="Имя">
        <FormInput v-model="form.name" placeholder="Введите имя" />
      </FormGroup>
      <FormGroup label="Пароль">
        <FormInput v-model="form.password" type="password" />
      </FormGroup>
      <button type="submit" class="btn">Войти</button>
    </form>
  </main>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      form: {
        name: null,
        password: null,
      },
    }
  },
  methods: {
    async onSubmit() {
      await this.$auth
        .login({ data: this.form })
        .then(async (response) => {
          await this.$auth.setUser(response.data.user)
          this.$router.push('/')
        })
        .catch((e) => {
          return this.$error({ statusCode: e?.response?.status || 500 })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-login {
  flex: 1 1 auto;
  max-width: 320px;
}
</style>
