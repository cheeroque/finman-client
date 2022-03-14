import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export default function VeeValidatePlugin() {
  setInteractionMode('passive')
}
