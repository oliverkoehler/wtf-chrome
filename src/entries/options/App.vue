<template>
  <main class="w-full min-h-[100vh] bg-[#182028] text-white">
    <AppOptions v-if="storage.apiKey" :storage="storage" />
    <AppSetupKey v-else />
  </main>
</template>

<script setup>
import AppOptions from "~/entries/options/components/AppOptions.vue";

import { useStorage } from "@vueuse/core";
import AppSetupKey from "~/components/AppSetupKey.vue";

const storage = useStorage('wtf', {})
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
