<template>
  <form @submit="$emit('submit')">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-lg bg-gray-700 text-white p-1.5 placeholder-gray-400"
      :placeholder="placeholder"
    />
  </form>
</template>

<script setup>
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue', 'submit'])
</script>