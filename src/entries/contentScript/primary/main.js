import { createApp } from "vue";
import renderContent from "../renderContent";
import App from "./App.vue";

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  const ele = document.getElementsByClassName('toggle-block___oKpdF')[0]
  const rootDiv = document.createElement('div')
  rootDiv.setAttribute('id', 'app')
  ele.insertBefore(rootDiv, ele.children[1])

  const app = createApp(App)
  app.mount('#app')
});
