<template>
  <div class="form-control">
    <DatePicker
      v-model="localValue"
      :clearable="false"
      :lang="locale"
      :open="popupVisible"
      :placeholder="placeholder"
      confirm-text="Применить"
      format="DD.MM.YYYY, HH:mm"
      input-class="form-control-input"
      time-title-format="DD.MM.YYYY"
      type="datetime"
      confirm
      @confirm="closePopup"
      @focus="openPopup"
    >
      <template #header>
        <h4 class="mb-0">Выбор даты</h4>
      </template>
    </DatePicker>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['locale']),
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
      if (!popupContent && !datepicker) this.closePopup()
    },
  },
}
</script>
