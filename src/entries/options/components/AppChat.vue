<template>
  <AppBox>
    <div class="text-2xl font-semibold text-center border-b-2 border-white/50 pb-3">
      Words to highlight
    </div>
    <div>
      <AppInput v-model="wordToAddInput" @submit="handleNewWord" class="w-fit my-3" placeholder="Add new word"/>
    </div>
    <div>
      <div v-for="(word, index) in existingWords" class="text-base flex items-center" :key="index">
        <AppIconCircleXmark class="mr-2 text-white/20 hover:text-white/50 transition cursor-pointer" @click="handleRemoveWord(index)"/> {{ word }}
      </div>
    </div>
  </AppBox>
</template>

<script setup>
import AppBox from "~/entries/options/components/AppBox.vue";
import {ref} from "vue";
import AppInput from "~/entries/options/components/AppInput.vue";
import AppIconCircleXmark from "~/entries/options/icons/AppIconCircleXmark.vue";

const existingWords = ref([])

chrome.storage.sync.get(['words']).then(res => {
  if (res.words) {
    existingWords.value = Object.values(res.words)
  } else {
    chrome.storage.sync.set({ 'words': [] })
  }
})

const wordToAddInput = ref('')

const handleNewWord = async () => {
  existingWords.value.push(wordToAddInput.value)
  wordToAddInput.value = ''

  chrome.storage.sync.set({ 'words': existingWords.value })
}

const handleRemoveWord = (index) => {
  existingWords.value.splice(index, 1)
  chrome.storage.sync.set({ 'words': existingWords.value })
}
</script>