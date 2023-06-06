<template>
  <div class="grid justify-center items-center text-gray-400">
    <div class="flex justify-center font-semibold"><h2 class="text-lg">Setup</h2></div>
    <div>Please add your API Key to continue:</div>
    <input v-model="apiKeyInput" class="my-2"/>
    <div class="max-w-[190px]">
      <span class="text-center text-red-500 font-semibold">{{ apiError }}</span>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import logo from "~/assets/logo.svg";
import {useFetch, useStorage} from "@vueuse/core";

const storage = useStorage('wtf', {})

let apiError = ref('')
const apiKeyInput = ref('8na2sIkpOnDyVLR')

watch(apiKeyInput, async (newValue) => {
  if (newValue.length === 16) {
    const { data } = await useFetch('https://api.torn.com/faction/?selections=basic&key=' + apiKeyInput.value).json()

    if (data.value.error) {
      apiError.value = data.value.error.error
    } else {
      apiError.value = ''
      storage.value = {
        apiKey: apiKeyInput.value,
        isReviver: data.value.name === 'WTF Healers' || data.value.name === 'WTF Medical',
        faction: data.value.name
      }

      chrome.storage.sync.get('revives').then(revives => {
        if (!revives.today) {
          chrome.storage.sync.set({
            revives: {
              today: 0,
              yesterday: 0,
              thisWeek: 0,
              total: 0,
              lastUpdated: new Date().toJSON()
            }
          })
        }
      })
    }
  }
})
</script>