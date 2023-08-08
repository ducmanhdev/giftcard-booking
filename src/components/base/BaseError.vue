<template>
  <p class="text-danger p-4 border border-danger rounded-lg">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
