<template>
  <div :class="{ show: dropdownShow }" :lang="locale" class="dropdown dropup date-time-picker">
    <b-input-group>
      <b-form-input
        v-model="localDateTimeString"
        :state="error ? false : null"
        type="text"
        lazy
        @click="showDropdown"
      ></b-form-input>
      <template #append>
        <b-button variant="border" block @click="setNow"> Сейчас </b-button>
      </template>
    </b-input-group>
    <div :class="{ show: dropdownShow }" class="dropdown-menu" role="menu" tabindex="-1">
      <div class="dropdown-content">
        <div class="dropdown-pane dropdown-pane-calendar">
          <b-calendar v-model="localDate" :locale="locale" hide-header value-as-date></b-calendar>
        </div>
        <div class="dropdown-pane dropdown-pane-time">
          <b-time v-model="localTime" :locale="locale" hide-header></b-time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Date,
      default: null
    },
    locale: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dropdownShow: false,
      error: false
    }
  },
  computed: {
    localDate: {
      get() {
        return this.value
      },
      set(newValue) {
        this.localValue = new Date(`${this.$isoDate(newValue)}T${this.localTime}`)
      }
    },
    localTime: {
      get() {
        return this.$isoTime(this.value)
      },
      set(newValue) {
        this.localValue = new Date(`${this.$isoDate(this.localDate)}T${newValue}`)
      }
    },
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.error = false
        this.$emit('change', newValue)
      }
    },
    localDateTimeString: {
      get() {
        return this.value ? `${this.$isoDate(this.value)} ${this.$isoTime(this.value)}` : 'Дата не выбрана'
      },
      set(newValue) {
        if (this.$isValidDate(new Date(newValue))) this.localValue = new Date(newValue)
        else this.error = true
      }
    }
  },
  methods: {
    showDropdown() {
      this.dropdownShow = true
      document.addEventListener('click', this.onClickOutside)
    },
    onClickOutside({ target }) {
      if (!target.closest('.date-time-picker')) {
        this.hideDropdown()
      }
    },
    hideDropdown() {
      this.dropdownShow = false
      document.removeEventListener('click', this.onClickOutside)
    },
    setNow() {
      this.localValue = new Date()
      this.hideDropdown()
    }
  }
}
</script>
