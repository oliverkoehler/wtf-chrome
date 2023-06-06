<template>
  <div class="flex">
    <!-- SideNavi -->
    <div
      :class="isOpen ? 'w-40' : 'w-60'"
      class="flex flex-col min-h-screen p-3 duration-300 bg-gray-800 shadow"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Dashboard</h2>
        </div>
        <div class="flex-1">
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li
              v-for="(item, index) in menuItems" class="rounded-md"
              :class="{
                'bg-white/10 transition duration-500': currentView === item.key
              }"
              :key="index"
              @click="currentView = item.key"
            >
              <a
                href="#"
                class="flex items-center p-2 space-x-3 rounded-md"
              >
                <component :is="item.icon" class="w-6 h-6 text-gray-100"/>
                <span class="text-gray-100">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="m-10">
      <AppHome v-if="currentView === 'home'"/>
    </div>
  </div>
</template>

<script setup>
import {markRaw, ref} from "vue";
import AppIconChat from "~/entries/options/icons/AppIconChat.vue";
import AppIconHome from "~/entries/options/icons/appiconhome.vue";
import AppIconChartSimple from "~/components/AppIconChartSimple.vue";
import AppIconRightFromBracket from "~/components/AppIconRightFromBracket.vue";
import AppHome from "~/entries/options/components/AppHome.vue";

const isOpen = ref(false);

const currentView = ref('home')

const menuItems = ref([
  {
    label: 'Home',
    key: 'home',
    icon: markRaw(AppIconHome),
  },
  {
    label: 'Chat',
    key: 'chat',
    icon: markRaw(AppIconChat)
  },
  {
    label: 'Stats',
    key: 'stats',
    icon: markRaw(AppIconChartSimple)
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: markRaw(AppIconRightFromBracket)
  }
])
</script>