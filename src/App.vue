<template>
  <div
    class="fixed inset-0 z-[999] flex justify-center items-center bg-white p-4"
    v-if="isInitLoading"
  >
    <img src="/src/assets/images/loading.svg" alt="Loading..." />
  </div>
  <the-header></the-header>
  <main>
    <div class="container" v-if="!isInitLoading && initError">
      <base-error :message="initError"></base-error>
    </div>
    <router-view v-if="!isInitLoading && !initError"></router-view>
  </main>
  <the-footer></the-footer>
  <notifications />
  <reload-prompt />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheFooter from '@/components/layouts/TheFooter.vue';
import BaseError from '@/components/base/BaseError.vue';
import ReloadPrompt from '@/components/ReloadPrompt.vue';
import { useGiftCardStore } from '@/stores/gift-card';

const giftCardStore = useGiftCardStore();

const shopId = 1;
const isInitLoading = computed(() => giftCardStore.isInitLoading);
const initError = computed(() => giftCardStore.initError);
const initData = async () => {
  try {
    await giftCardStore.init(shopId);
  } catch (error) {
    console.error(error);
  }
};
initData();

const setViewportProperty = () => {
  let customViewportCorrectionVariable = 'vh';
  let prevClientHeight: number;
  const customVar = '--' + (customViewportCorrectionVariable || 'vh');
  const doc = document.documentElement;

  function handleResize() {
    let clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight() {
      doc.style.setProperty(customVar, clientHeight * 0.01 + 'px');
      prevClientHeight = clientHeight;
    });
  }

  handleResize();
  return handleResize;
};
onMounted(async () => {
  window.addEventListener('resize', setViewportProperty());
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', setViewportProperty());
});
</script>

<style lang="scss" scoped></style>
