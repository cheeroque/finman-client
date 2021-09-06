<template>
  <f-input-group>
    <date-picker
      v-model="localValue"
      :clearable="false"
      input-class="form-control"
      prefix-class="finman"
      type="datetime"
      value-type="date"
    >
      <template #icon-calendar>
        <svg-icon name="calendar-24" width="24" height="24" aria-hidden="true" />
      </template>
    </date-picker>
    <template #append>
      <button class="btn btn-gray-300" @click.prevent="setNow">Сейчас</button>
    </template>
  </f-input-group>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'

export default {
  components: {
    DatePicker
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Date,
      default() {
        return null
      }
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    setNow() {
      this.localValue = new Date()
    }
  }
}
</script>

<style lang="scss">
$namespace: 'finman';

$default-color: $body-color;
$primary-color: $primary;
$today-color: $primary;
$input-border-color: $border-color;
$input-color: $body-color;

@import '~vue2-datepicker/scss/index.scss';

.finman-datepicker {
  width: 100%;

  .form-control {
    padding-right: calc(#{$btn-input-padding-x} + 24px);
  }

  .finman-icon-calendar {
    right: $btn-input-padding-x / 2;
    width: 24px;
    height: 24px;
    color: $border-color;

    .icon {
      width: auto;
      height: auto;
    }
  }
}

.finman-datepicker-main {
  font: inherit;
  color: $body-color;
  border: $border-width solid $border-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;

  .finman-calendar {
    width: 320px;
    padding: 1.25rem;
  }

  .finman-calendar-header {
    display: flex;
    align-items: center;
    height: auto;

    .finman-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: calc(24px + 1rem);
      height: calc(24px + 1rem);
      padding: 0.5rem;
      font-family: $font-family-alternate;
      font-size: $font-size-2;
      font-weight: $font-weight-medium;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-position: center;
      background-size: 24px;
      background-repeat: no-repeat;
      transition: $transition-base;
      transition-property: color, border-color, background-color, box-shadow;

      & > i {
        display: none;
      }

      &:hover {
        background-color: darken($white, 10%);
      }
    }

    .finman-btn-icon-double-left {
      order: 0;
      background-image: url('~/assets/images/icons/page-first-24.svg');
    }
    .finman-btn-icon-left {
      order: 1;
      background-image: url('~/assets/images/icons/chevron-left-24.svg');
    }
    .finman-btn-icon-right {
      order: 3;
      background-image: url('~/assets/images/icons/chevron-right-24.svg');
    }
    .finman-btn-icon-double-right {
      order: 4;
      background-image: url('~/assets/images/icons/page-last-24.svg');
    }

    .finman-calendar-header-label {
      flex: 1 1 auto;
      order: 2;

      .finman-btn {
        width: auto;
        height: auto;
        padding: 0.25rem;

        &:hover {
          background-color: transparent;
        }
      }
    }
  }

  .finman-calendar-content {
    height: auto;
  }

  .finman-table-date {
    th,
    td {
      height: 40px;
      font-size: $font-size-2;
    }

    th {
      font-size: $font-size-1;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .finman-time {
    display: flex;
    flex-direction: column;
    border-radius: $border-radius;
  }

  .finman-time-header {
    .finman-btn {
      width: 100%;
    }
  }

  .finman-time-content {
    flex: 1 1 auto;
  }

  .finman-time-item {
    height: 40px;
    font-size: $font-size-2;
  }
}
</style>
