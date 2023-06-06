<template>
  <div>
    <div class="my-4">
      <div class="text-lg">Your revive stats:</div>
      <div>
        Total: {{ stats.total }}
      </div>
    </div>
    <button @click="handleAddRevive" class="bg-gray-600 p-1 rounded border-2 hover:border-gray-700 border-gray-500">Add Revive</button>
    <button @click="handleResetStats" class="bg-gray-600 p-1 rounded border-2 hover:border-gray-700 border-gray-500">Reset Stats</button>
    <button @click="handleOpenOptionsPage" class="bg-gray-600 p-1 rounded border-2 hover:border-gray-700 border-gray-500">Settings</button>
  </div>
</template>

<script setup>
import { updateRevives } from '../helper'
import {useStorage} from "@vueuse/core";
import {ref} from "vue";
// updateRevives()

const props = defineProps(['storage'])
const stats = ref({})

chrome.storage.sync.get('revives').then(res => {
  stats.value = res.revives
})

const handleResetStats = () => {
  chrome.storage.sync.remove(['revives'])
  props.storage.apiKey = undefined
}

const handleAddRevive = async () => {
  stats.value = await updateRevives(stats.value)
}

const handleOpenOptionsPage = async () => {
  chrome.runtime.openOptionsPage()
}
</script>