<template>
  <div :class="{ loading: loading }" class="records-list">
    <slot name="header">
      <RecordListHeader />
    </slot>
    <div role="grid" class="records-list-content">
      <div class="records-list-columns">
        <div class="record-date">{{ $t('date') }}</div>
        <div class="record-sum">{{ $t('sum') }}</div>
        <div class="record-category">{{ $t('category.category') }}</div>
        <div class="record-note">{{ $t('note') }}</div>
      </div>
      <RecordCardEmpty v-if="!(records && records.length)" />
      <template v-else>
        <RecordCard
          v-for="record in records"
          :key="`record-${record.id}`"
          :display-variant="displayVariant"
          :record="record"
          class="records-list-item"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayVariant: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    records: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.records-list {
  .records-list-content {
    transition: $transition;
    transition-property: opacity;
  }

  &.loading {
    .records-list-content {
      opacity: 0.25;
    }
  }
}

@include media-max-width('md') {
  ::v-deep {
    .records-list-columns {
      display: none;
    }

    .records-list-item {
      margin-bottom: 0.5rem;
    }

    .record-note-edit {
      display: none;
    }
  }
}

@include media-min-width('md') {
  .records-list {
    border-radius: $card-border-radius;
    background-color: $card-bg;
    overflow: hidden;
  }

  .records-list-content {
    ::v-deep {
      .records-list-columns,
      .records-list-item {
        display: flex;
        gap: 0;
        padding: 0;
      }

      .record-date {
        order: 0;
        width: 21%;
      }

      .record-sum {
        order: 1;
        width: 15%;
      }

      .record-category {
        order: 2;
        width: 27%;
      }

      .record-note {
        order: 3;
        width: 37%;
      }

      .records-list-item {
        border-radius: 0;

        .record-date,
        .record-sum,
        .record-category,
        .record-note {
          display: flex;
          flex: 0 0 auto;
          align-items: flex-start;
          padding: 0.875rem 1rem;
          font-size: $font-size-base;
          font-weight: $font-weight-normal;
          line-height: $line-height-base;
        }

        .record-date,
        .record-category {
          white-space: nowrap;

          & > a {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .record-sum {
          font-size: $font-size-base * 1.25;
          font-weight: $font-weight-medium;
          line-height: calc(#{$line-height-base} / 1.25);
          text-align: left;
          color: inherit;

          & > a {
            display: inline;
            text-align: left;
          }
        }

        .record-note {
          display: flex;
          align-items: center;
        }

        .record-note-edit {
          display: flex;
          flex: 1 1 auto;
          align-self: flex-start;
          justify-content: flex-end;
          margin-left: 1rem;
          padding: 0;
          border: none;
          color: var(--primary-container);
          appearance: none;
        }

        &:nth-child(even) {
          color: var(--on-surface);
          background-color: var(--surface);
        }

        &:hover {
          color: var(--on-secondary-container);
          background-color: var(--secondary-container);

          .record-category,
          .record-note-edit {
            color: var(--secondary);
          }
        }
      }

      .records-list-columns {
        font-family: $font-family-alternate;
        font-weight: $font-weight-medium;
        color: var(--primary);
        border-bottom: $border-width solid var(--primary);

        .record-date,
        .record-sum,
        .record-category,
        .record-note {
          flex: 0 0 auto;
          padding: 1rem;
        }
      }
    }
  }

  .show-all {
    .records-list-content {
      &:not(.loading) {
        .records-list-item {
          &.record-card-income {
            color: var(--on-success-container);
            background-color: var(--success-container);

            .record-category,
            .record-note-edit {
              color: var(--success);
            }
          }
        }
      }
    }
  }
}
</style>
