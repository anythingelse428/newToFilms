import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Api from '../src/api'
import store from './store'
import "@egjs/vue3-flicking/dist/flicking-inline.css";
function importRemoteScript (url, data = {}) {
    const Script = document.createElement('script')
    Script.setAttribute('src', url)
    for (const attribute in data) {
      Script.setAttribute(attribute, data[attribute])
    }
    document.body.append(Script)
  }
  
  /* Bootstrap 5 */
  importRemoteScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', {
    integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
    crossorigin: 'anonymous'
  })
  
createApp(App).use(router).use(store).use(Api).mount("#app");
