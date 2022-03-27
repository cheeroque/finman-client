export default async function ({ $auth, store }) {
  /* Get global data */
  if ($auth.$state.loggedIn) {
    try {
      await store.dispatch('fetchTotal')
      await store.dispatch('fetchLatestShapshot')
      await store.dispatch('fetchCategories')
      await store.dispatch('fetchCurrentMonthRecords')
    } catch (error) {
      if (error?.response?.status === 401) {
        await $auth.logout()
        $auth.setUser(false)
      } else {
        throw error
      }
    }
  }

  /* Close navigation drawer */
  store.dispatch('setDrawerOpen', false)
}
