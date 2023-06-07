import {createApp, ref, render, watch} from "vue";
import renderContent from "../renderContent";
import App from "./App.vue";
import { waitForElm, getUrlPath } from '../../../helper'

const user = ref([])

watch(user, async () => {
  await reviveHandler()
})
const reviveHandler = async () => {
  await waitForElm('#mainContainer > div.content-wrapper.spring > div.userlist-wrapper.hospital-list-wrapper > ul > li:nth-child(1) > span > span.reason')

  const revives = document.getElementsByClassName('user name ')

  console.log(user.value)
  for (let revive of revives) {
    if (revive.innerText === user.value[0]) {
      revive.parentElement.style.backgroundColor = 'red'
    }
  }
}

const mountApp = async () => {
  const path = getUrlPath()

  if (path.includes('hospitalview')) await reviveHandler()

  const app = createApp(App)
  app.mount('#app')
}

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, async (appRoot) => {
  const path = getUrlPath()
  if (path.includes('hospitalview')) await mountApp()
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  mountApp()
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  user.value = Object.values(changes.words.newValue)

})