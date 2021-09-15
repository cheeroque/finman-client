<template>
  <transition name="fade" mode="out-in">
    <div v-if="monthlyExpenses || monthlyIncomes" class="app-monthly">
      <nuxt-link v-if="monthlyExpenses" :to="`/month/${$monthApiLink(Date.now())}`" class="text-danger">
        <svg-icon name="chevron-down-24" width="24" height="24" class="mr-4" aria-hidden="true" />
        {{ monthlyExpenses }}&nbsp;₽
      </nuxt-link>
      <nuxt-link v-if="monthlyIncomes" :to="`/month/${$monthApiLink(Date.now())}`" class="text-success">
        <svg-icon name="chevron-up-24" width="24" height="24" class="mr-4" aria-hidden="true" />
        {{ monthlyIncomes }}&nbsp;₽
      </nuxt-link>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('fetchMonthly')
  },
  computed: {
    ...mapGetters(['monthlyExpenses', 'monthlyIncomes'])
  }
}
</script>

<style lang="scss" scoped>
.app-monthly {
  display: flex;
  gap: 4rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: 1;

  a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
}

@media (max-width: 991.98px) {
  .app-monthly {
    display: none;
  }
}
</style>
