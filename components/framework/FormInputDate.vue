<template>
  <div class="input-group">
    <DatePicker
      v-model="localValue"
      :clearable="false"
      :confirm-text="$t('apply')"
      :lang="$i18n.locale"
      :open="popupVisible"
      :placeholder="placeholder"
      format="DD.MM.YYYY, HH:mm"
      input-class="form-control"
      time-title-format="DD.MM.YYYY"
      type="datetime"
      confirm
      @click.stop.prevent
      @confirm="closePopup"
      @focus="openPopup"
    >
      <template #header>
        <h4 class="mb-0">{{ $t('dateAndTime') }}</h4>
        <button
          :title="$t('close')"
          :aria-label="$t('close')"
          class="btn btn-close"
          @click="closePopup"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </template>
    </DatePicker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'

export default {
  components: {
    DatePicker,
  },
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      popupVisible: false,
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  beforeDestroy() {
    this.closePopup()
  },
  methods: {
    closePopup() {
      this.popupVisible = false
      document.removeEventListener('click', this.onPopupClickOutside)
    },
    openPopup() {
      this.popupVisible = true
      document.addEventListener('click', this.onPopupClickOutside)
    },
    onPopupClickOutside(event) {
      const popupContent = event?.target?.closest('.mx-datepicker-content')
      const datepicker = event?.target?.closest('.mx-datepicker')
      if (!popupContent && !datepicker && event?.target !== document.body) {
        this.closePopup()
      }
    },
  },
}
</script>
