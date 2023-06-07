<template>
  <div class="lg:flex">
    <div>
      <AppBox class="font-semibold text-center">
        <h1 class="text-2xl text-center">Welcome</h1>
        <h2 class="text-xl text-center">{{ userInfos?.name ?? 'Mate' }}</h2>
        <div class=" text-white/50">{{ storage.faction }}</div>
        <div class="border-t-2 mt-2 pt-2 border-white/20 grid items-center justify-center">
          {{ userInfos?.status.description }}
        </div>
      </AppBox>

      <AppBox class="font-semibold text-center">
        <h1 class="text-2xl text-center">Revive Infos</h1>
        <div class="text-left text-md mt-2">Revive skill: {{ skillInfos?.personalstats.reviveskill ?? 0 }}</div>
        <div class="text-left text-md">Revives: {{ skillInfos?.personalstats.revives ?? 0 }}</div>
        <div class="text-left text-md">Revives received: {{ skillInfos?.personalstats.revivesreceived ?? 0 }}</div>
      </AppBox>
    </div>

    <div>
      <AppBox>
        <h1 class="text-2xl text-center font-semibold">Last revives</h1>
        <div class="max-h-[255px] overflow-auto">
          <div v-for="(revive, index) in revivesArray" :key="index">
            <span class="text-white/50 mr-2 min-w-[100px] inline-block">{{ moment(revive[1].timestamp * 1000).fromNow() }}</span>
            <span class="rounded-full mr-2 px-[7px]" :class="revive[1].result === 'failure' ? 'bg-red-900' : 'bg-green-700'"></span>
            <a target="_blank" :href="'https://www.torn.com/profiles.php?XID=' + revive[1].target_id">{{revive[1].target_name}}</a>
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
import {fetchTorn} from "~/helper";
const storage = useStorage('wtf', {})

const { data: userInfos } = fetchTorn('user/?selections=basic')
const { data: revives } = fetchTorn('user/?selections=revives')
const { data: skillInfos } = fetchTorn('user/?selections=personalstats')


const revivesArray = ref([])

watch(revives, () => {
  revivesArray.value = Object.entries(revives.value.revives).reverse()
})
</script>