export default async function ({ $auth, store }) {
  /* Get global data */
  if ($auth.$state.loggedIn) {
    await store.dispatch('fetchTotal')
    await store.dispatch('fetchLatestShapshot')
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchCurrentMonthRecords')
  }

  /* Close navigation drawer */
  store.dispatch('setDrawerOpen', false)
}
