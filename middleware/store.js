export default async function ({ $auth, store, error }) {
  /* Get global data */
  if ($auth.$state.loggedIn) {
    await store.dispatch('fetchTotal')
    await store.dispatch('fetchLatestShapshot')
  }

  /* Close navigation drawer */
  store.dispatch('setDrawerOpen', false)
}
