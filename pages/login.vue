<template>
  <main>
    <header class="page-header">
      <h3 class="header-content">
        {{ $t('login') }}
      </h3>
    </header>
    <div class="card">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="name"
            rules="required"
            slim
          >
            <FormGroup
              :label="$t('auth.form.name.label')"
              :state="valid || !validated ? null : false"
            >
              <FormInput
                v-model="form.name"
                :placeholder="$t('auth.form.name.placeholder')"
                :state="valid || !validated ? null : false"
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
              :label="$t('auth.form.password.label')"
              :state="valid || !validated ? null : false"
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
              {{ $t('auth.form.enter') }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PagesLogin',
  layout: 'simple',
  data() {
    return {
      form: {
        name: null,
        password: null,
      },
    }
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/categories')
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
          message = this.$t('auth.error')
        }
        this.$errorToast(error, message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header-content {
  text-align: center;
}

.form-login {
  flex: 1 1 auto;
  max-width: 320px;
}
</style>
