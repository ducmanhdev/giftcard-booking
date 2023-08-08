<template>
  <Transition name="slide-from-right">
    <div
      class="mb-8 bg-white text-body rounded-xl shadow-md py-4 px-5 pb-2 box-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
      v-if="isVisible"
    >
      <template v-if="isGiftSent">
        <p class="text-2xl font-bold mb-3">Gift sent, thank you!</p>
        <p>
          {{ orderInfo.giftcard[0].recipient_phone }} was sent a
          {{ useFormatCurrency(orderInfo.giftcard[0].value) }} eGift Card to
          their inbox. Check your inbox for a confirmation.
        </p>
      </template>
      <template v-else>
        <p class="text-2xl font-bold mb-3">Gift will be send, thank you!</p>
        <p>
          {{ orderInfo.giftcard[0].recipient_phone }} will send a
          {{ useFormatCurrency(orderInfo.giftcard[0].value) }} eGift Card to
          their inbox. Check your inbox for a confirmation.
        </p>
      </template>
      <div class="flex justify-end space-x-3">
        <button type="button" class="btn btn-text" @click="handleResend">
          Gift it again
        </button>
        <button type="button" class="btn btn-text" @click="handleHide">
          Got it
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGiftCardStore } from '@/stores/gift-card';
import { useFormatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
const giftCardStore = useGiftCardStore();
const router = useRouter();

const orderInfo = computed(() => giftCardStore.orderInfo);
const isGiftSent = computed(
  () =>
    dayjs(orderInfo.value.giftcard[0].delivery_date).diff(new Date(), 'day') <=
    0,
);
const isVisible = ref(!!giftCardStore.orderInfo);
const handleHide = () => {
  isVisible.value = false;
};
const handleResend = () => {
  router.push({
    name: 'Custom',
    params: {
      id: giftCardStore.orderInfo.giftcard[0].template.id,
    },
    query: {
      'gift-again': 'true',
    },
  });
};
</script>

<style scoped></style>
