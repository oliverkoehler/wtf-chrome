import {createApp, render} from "vue";
import renderContent from "../renderContent";
import App from "./App.vue";
import { waitForElm } from '../../../helper'

const reviveHandler = async () => {
  await waitForElm('#mainContainer > div.content-wrapper.spring > div.userlist-wrapper.hospital-list-wrapper > ul > li:nth-child(1) > span > span.reason')

  const blacklistUsers = ['Jake', 'Kanani']

  const revives = document.getElementsByClassName('user name ')

  for (let revive of revives) {
    if (revive.innerText === blacklistUsers[1]) {
      revive.parentElement.style.backgroundColor = 'red'
    }
  }
}

const mountApp = async () => {
  const path = window.location.pathname.replace('/', '').replace('.php', '')

  if (path.includes('hospitalview')) await reviveHandler()

  const app = createApp(App)
  app.mount('#app')
}

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, async (appRoot) => {
  await mountApp()
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  mountApp()
});