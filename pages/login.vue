<template>
  <DialogPage title="Авторизация" disable-back>
    <div class="card">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="name"
            rules="required"
            slim
          >
            <FormGroup :state="valid || !validated ? null : false" label="Имя">
              <FormInput
                v-model="form.name"
                :state="valid || !validated ? null : false"
                placeholder="Введите имя"
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
              :state="valid || !validated ? null : false"
              label="Пароль"
            >
              <FormInput
                v-model="form.password"
                :state="valid || !validated ? null : false"
                type="password"
              />
            </FormGroup>
          </ValidationProvider>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary ms-auto px-24">
              Войти
            </button>
          </div>
        </form>
      </ValidationObserver>
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
    async submit() {
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
