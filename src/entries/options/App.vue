<template>
  <main class="min-h-[100vh] bg-[#182028] text-white">
    <AppOptions v-if="storage.apiKey" />
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

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #182028;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #203748;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #203748;
}
</style>
