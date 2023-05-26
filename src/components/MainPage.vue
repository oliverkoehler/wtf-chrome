<template>
    <div class="grid justify-center items-center text-gray-400">
        <div class="text-center font-semibold">
            <h1 class="text-2xl">WTF Family</h1>
            <h2 class="text-lg">Setup</h2>
        </div>

        <div>Please add your API Key to continue:</div>
        <input v-model="apiKey" class="my-2"/>
        <div v-if="apiKey" class="max-w-[190px]">
            <span v-if="keyCorrect">Key is working</span>
            <span v-else class="text-center">Key is has not enough permissions or does not exists</span>
            {{ apiData }}
            {{ error }}
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import logo from "~/assets/logo.svg";
import {useFetch} from "@vueuse/core";

const apiKey = ref('')
const keyCorrect = ref(false)

let apiData = ref(null)

watch(apiKey, async (newValue) => {
    const { data, error } = await useFetch('https://api.torn.com/faction/?selections=basic&key=' + apiKey.value)
    apiData.value = data.value
})
</script>