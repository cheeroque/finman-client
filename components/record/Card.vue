<template>
  <div
    :class="{ 'record-card-income': displayVariant && isIncome }"
    class="card record-card"
  >
    <p class="record-date">
      <nuxt-link :to="monthLink">
        {{
          formatDate(record.created_at, locale, {
            dateStyle: 'long',
            timeStyle: 'short',
          })
        }}
      </nuxt-link>
    </p>
    <p class="record-category card-text-muted">
      <nuxt-link :to="`/categories/${record.category_id}`">
        {{ record.category && record.category.name }}
      </nuxt-link>
    </p>
    <p class="record-note">
      {{ record.note }}
      <button class="btn record-note-edit" @click="editRecord">
        <svg-icon
          name="edit-24"
          width="24"
          height="24"
          aria-label="Редактировать"
        />
      </button>
    </p>
    <p class="record-sum h3 card-text-accent">
      <button class="btn-link" @click="editRecord">
        {{ formatSum(record.sum, locale) }}&nbsp;₽
      </button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, formatSum } from '@/utils'

export default {
  props: {
    displayVariant: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['locale']),
    isIncome() {
      return Boolean(this.record?.category?.is_income)
    },
    monthLink() {
      const timestamp = Date.parse(this.record.created_at)
      const date = isNaN(timestamp) ? new Date() : new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return `/months/${year}-${month}`
    },
  },
  methods: {
    formatDate,
    formatSum,
    editRecord() {
      this.$dialogFullscreen(
        'RecordForm',
        { recordId: this.record.id },
        { title: 'Изменить запись' }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.record-card {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  gap: 0.25rem $grid-gap;
  font-size: $font-size-base * 0.875;

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
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    text-align: right;

    & > a,
    & > button {
      display: flex;
      flex: 1 1 100%;
      align-items: flex-end;
      justify-content: flex-end;
      text-align: right;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.show-all {
  .record-card-income {
    color: var(--on-success-container);
    background-color: var(--success-container);

    .card-text-muted,
    .card-text-accent {
      color: $success;
    }
  }
}
</style>
