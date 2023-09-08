import { createApp } from 'vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'

export default function (app : any) {
//   app.component('Field', Field)
//   app.component('Form', Form)
//   app.component('ErrorMessage', ErrorMessage)

  defineRule('required', required)
  defineRule('email', email)

  configure({
    validateOnInput: true,
  })
}
