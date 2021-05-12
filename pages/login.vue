<template>
  <b-container>
    {{ $auth.loggedIn }}
    <form @submit.prevent="onSubmit">
      <div>
        <input v-model="form.name" type="text" required />
      </div>
      <div>
        <input v-model="form.password" type="password" required />
      </div>
      <b-button type="submit"> Войти </b-button>
    </form>
  </b-container>
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
      try {
        await this.$auth.login({ data: this.form }).then((response) => {
          this.$auth.setUser(response.data.user)
        })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
