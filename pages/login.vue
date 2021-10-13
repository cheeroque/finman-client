<template>
  <form class="form-login" @submit.prevent="onSubmit">
    <h3 class="text-center mb-24">Авторизация</h3>
    <f-form-group label="Логин">
      <f-input v-model="form.name" type="text" required />
    </f-form-group>
    <f-form-group label="Пароль" class="mb-32">
      <f-input v-model="form.password" type="password" required />
    </f-form-group>
    <div class="row">
      <div class="col-8 col-start-3">
        <button class="btn btn-block btn-lg btn-success" type="submit">Войти</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      form: {
        name: null,
        password: null
      }
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
        .catch((error) => {
          this.$store.commit('SET_ERROR', { path: 'login', error })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  flex: 1 1 auto;
  max-width: 320px;
}
</style>
