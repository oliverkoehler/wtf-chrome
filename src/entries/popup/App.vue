<template>
  <main class="bg-[#182028] text-white border-4 border-gray-950 p-2 max-w-xs w-[670px]">
    <div class="text-center font-semibold">
      <h1 class="text-2xl">WTF Family</h1>
    </div>
      <AppSetupKey v-if="!storage.apiKey" />
      <AppReviver v-if="storage.isReviver && storage.apiKey" :storage="storage"/>
  </main>
</template>

<script setup>
import AppSetupKey from "~/components/AppSetupKey.vue";
import AppReviver from "~/components/AppReviver.vue";
import {useStorage} from "@vueuse/core";

const storage = useStorage('wtf', {})
const resetStore = false

if (resetStore) {
  chrome.storage.sync.remove(['revives'])
}
</script>