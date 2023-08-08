<template>
  <header
    class="py-2 bg-white text-black sticky top-0 z-50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.05)] h-[var(--header-height)] flex items-center"
  >
    <div class="container flex items-center">
      <router-link :to="{ name: 'Home' }" class="inline-block">
        <img src="@/assets/images/logo-2.svg" alt="" class="w-[140px] h-auto sm:w-[206px]" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
