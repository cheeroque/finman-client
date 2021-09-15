<template>
  <f-modal v-model="localVisible" title="Добавить дату сверки" @show="onShow">
    <form @submit.prevent>
      <f-form-group label="Дата и время" label-for="revise-edit-datetime">
        <f-datepicker id="revise-edit-datetime" v-model="createdAt" />
      </f-form-group>
      <f-form-group label="Текущий баланс" label-for="revise-edit-balance">
        <f-input id="revise-edit-balance" v-model="balance" type="number" readonly />
      </f-form-group>
      <f-form-group label="Комментарий" label-for="revise-edit-note" class="mb-0">
        <f-input id="revise-edit-note" v-model="note" type="text" />
      </f-form-group>
    </form>
    <template #modal-footer="{ close }">
      <button class="btn btn-gray-300 ms-auto" title="Отмена" aria-label="Отмена" @click="close">Отмена</button>
      <button class="btn btn-primary" title="Сохранить" aria-label="Сохранить" @click="onSubmit(close)">
        Сохранить
      </button>
    </template>
  </f-modal>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      balance: null,
      createdAt: null,
      note: null
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  watch: {
    item(value) {
      this.initData(value)
    }
  },
  methods: {
    initData(item) {
      this.balance = this.$store.state.total
      this.createdAt = item.created_at ? new Date(item.created_at) : new Date()
      this.note = item.note
    },
    onShow() {
      this.initData(this.item)
    },
    async onSubmit(callback) {
      await this.$axios.$post('revises', {
        balance: this.balance,
        created_at: this.createdAt.toISOString(),
        note: this.note
      })
      this.$store.dispatch('fetchLatestRevise')
      callback()
    }
  }
}
</script>
