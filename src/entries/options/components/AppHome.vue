<template>
  <div class="flex">
    <div>
      <AppBox class="font-semibold text-center">
        <h1 class="text-2xl text-center">Welcome</h1>
        <h2 class="text-xl text-center">{{ userInfos?.name }}</h2>
        <div class=" text-white/50">{{ storage.faction }}</div>
        <div class="border-t-2 mt-2 pt-2 border-white/20 grid items-center justify-center">
          {{ userInfos?.status.description }}
        </div>
      </AppBox>

      <AppBox class="font-semibold text-center mt-10">
        <h1 class="text-2xl text-center">Revive Infos</h1>
        <div class="text-left text-md mt-2">Revive skill: {{ skillInfos?.personalstats.reviveskill }}</div>
        <div class="text-left text-md">Revives: {{ skillInfos?.personalstats.revives }}</div>
        <div class="text-left text-md">Revives received: {{ skillInfos?.personalstats.revivesreceived }}</div>
      </AppBox>
    </div>

    <div class="ml-10">
      <AppBox>
        <h1 class="text-2xl text-center font-semibold">Last revives</h1>
        <div class="max-h-[275px] overflow-auto">
          <div v-for="(revive, index) in revivesArray" :key="index">
            <span class="text-white/50 mr-2">{{ moment(revive[1].timestamp * 1000).fromNow() }}</span>
            <span class="rounded-full mr-1 px-[7px]" :class="revive[1].result === 'failure' ? 'bg-red-900' : 'bg-green-700'"></span>
            {{revive[1].target_name}}
          </div>
        </div>
      </AppBox>
    </div>
  </div>
</template>

<script setup>
import AppBox from "~/entries/options/components/AppBox.vue";
import {useFetch, useStorage} from "@vueuse/core";
import {ref, watch} from "vue";
import moment from "moment";
const storage = useStorage('wtf', {})

const { data: userInfos } = useFetch('https://api.torn.com/user/?selections=basic&key=' + storage.value.apiKey).json()
const { data: revives } = useFetch('https://api.torn.com/user/?selections=revives&key=' + storage.value.apiKey).json()
const { data: skillInfos } = useFetch('https://api.torn.com/user/?selections=personalstats&key=' + storage.value.apiKey).json()

const revivesArray = ref([])

watch(revives, () => {
  revivesArray.value = Object.entries(revives.value.revives).reverse()
})
</script>

<style>
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