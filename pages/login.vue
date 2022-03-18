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
      <transition name="fade">
        <div v-if="error" class="error-message">
          {{ errorMessage }}
        </div>
      </transition>
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
      error: null,
    }
  },
  computed: {
    errorMessage() {
      if (this.error) {
        if (this.error.status === 401) return 'Ошибка авторизации'
        else return 'Ошибка'
      } else return null
    },
  },
  methods: {
    async onSubmit() {
      this.error = null
      try {
        const response = await this.$auth.login({ data: this.form })
        await this.$auth.setUser(response.data.user)
      } catch (error) {
        this.error = error.response
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

.dialog-header {
  min-height: calc(24px + 2.5rem);
  padding-left: $grid-gap * 0.5;
  padding-right: $grid-gap * 0.5;
}

.error-message {
  margin-top: 1rem;
  padding: $toast-padding-y $toast-padding-x;
  font-size: $font-size-base * 0.875;
  border-radius: $toast-border-radius;
  color: var(--on-danger-container);
  background-color: var(--danger-container);
}
</style>
