import { message } from 'antd'

let loading = null
 
export default {
  show(text) {
    if(loading) {
      loading()
    }

    loading = message.loading(text, 0)
  },

  hide() {
    if(loading) {
      loading()
      loading = null
    }
  }
}