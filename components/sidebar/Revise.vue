<template>
  <li class="nav-item">
    <a href="#" class="nav-link" @click="$root.$emit('revise-edit', latestRevise)">
      <span v-if="latestRevise && latestRevise.created_at">
        {{
          $dateWithFormat(latestRevise.created_at, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </span>
      <span v-else class="text-muted">нет данных</span>
    </a>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['latestRevise'])
  }
}
</script>
