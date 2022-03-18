<template>
  <DialogPage title="Авторизация" disable-back>
    <div class="card">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="name"
            rules="required"
            slim
          >
            <FormGroup :state="valid || !validated ? null : false" label="Имя">
              <FormInput
                v-model="form.name"
                :state="valid || !validated ? null : false"
                placeholder="Введите имя"
                @input="validateOnInput($event, validate)"
              />
            </FormGroup>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
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
                @input="validateOnInput($event, validate)"
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
    validateOnInput(event, validate) {
      if (event) validate(event)
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
