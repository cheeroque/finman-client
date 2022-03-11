export default async function ({ store, error }) {
  /* Get global data */
  await store.dispatch('fetchTotal')
  await store.dispatch('fetchLatestShapshot')

  /* Close navigation drawer */
  store.dispatch('setDrawerOpen', false)
}
