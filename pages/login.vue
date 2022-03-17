<template>
  <div class="dialog dialog-fullscreen dialog-page">
    <header class="dialog-header">
      <h4 class="dialog-title mb-0">Авторизация</h4>
    </header>
    <main class="container">
      <div class="card">
        <form @submit.prevent="onSubmit">
          <FormGroup label="Имя">
            <FormInput v-model="form.name" placeholder="Введите имя" />
          </FormGroup>
          <FormGroup label="Пароль">
            <FormInput v-model="form.password" type="password" />
          </FormGroup>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary ms-auto px-24">
              Войти
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
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

.dialog-header {
  min-height: calc(24px + 2.5rem);
  padding-left: $grid-gap * 0.5;
  padding-right: $grid-gap * 0.5;
}
</style>
