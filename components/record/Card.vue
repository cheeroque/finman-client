<template>
  <div class="card record-card">
    <p class="record-date">
      <nuxt-link :to="monthLink">
        {{ formatDate(record.created_at, locale, { dateStyle: 'long', timeStyle: 'short' }) }}
      </nuxt-link>
    </p>
    <p class="record-category card-text-muted">
      <nuxt-link :to="`/category/${record.category_id}`">
        {{ record.category && record.category.name }}
      </nuxt-link>
    </p>
    <p class="record-note">{{ record.note }}</p>
    <p class="record-sum h3 card-text-accent">
      <a href="#" @click.prevent="$emit('record-edit', record)"> {{ formatSum(record.sum, locale) }}&nbsp;₽ </a>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatSum } from '@/utils'

export default {
  props: {
    record: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['locale']),
    monthLink() {
      const timestamp = Date.parse(this.record.created_at)
      const date = isNaN(timestamp) ? new Date() : new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return `${year}-${month}`
    },
  },
  methods: {
    formatDate,
    formatSum,
  },
}
</script>

<style lang="scss" scoped>
.record-card {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  gap: 0.25rem 1rem;

  p {
    margin-bottom: 0;
    line-height: $line-height-heading;
  }

  .record-date {
    grid-column: 1 / 2;
    font-weight: $font-weight-medium;
  }

  .record-category {
    grid-column: 1 / 2;
  }

  .record-note {
    grid-column: 1 / 2;
  }

  .record-sum {
    display: flex;
    align-items: flex-end;
    justify-self: end;
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    // margin-left: auto;
    text-align: right;

    a:hover {
      text-decoration: none;
    }
  }
}
</style>
