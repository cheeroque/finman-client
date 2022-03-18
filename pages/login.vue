<template>
  <DialogPage title="Авторизация" disable-back>
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
  </DialogPage>
</template>

<script>
export default {
  layout: 'simple',
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
      try {
        const response = await this.$auth.login({ data: this.form })
        await this.$auth.setUser(response.data.user)
      } catch (error) {
        let message
        if (error?.response?.status === 401) {
          message = 'Неправильный логин или пароль'
        }
        this.$errorToast(error, message)
      }
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
