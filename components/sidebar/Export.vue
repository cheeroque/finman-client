<template>
  <li class="nav-item">
    <a href="#" class="nav-link" @click="downloadFile"> Экспорт данных </a>
  </li>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    publicUrl() {
      return process.env.PUBLIC_URL
    }
  },
  methods: {
    async downloadFile() {
      this.loading = true
      const path = await this.$axios.$get('export')
      this.loading = false
      const link = document.createElement('a')
      link.href = `${process.env.PUBLIC_URL}${path}`
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
