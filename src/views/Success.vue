<template>
  <div class="">
    <banner class="hidden sm:block"></banner>
    <div
      class="py-8 custom-h-screen sm:!min-h-0 flex sm:block flex-col sm:py-9"
    >
      <div class="container max-w-[648px]">
        <h1
          class="mb-9 flex flex-col text-2xl sm:text-[32px] font-bold text-success text-center justify-center items-center space-y-4"
        >
          <svg
            width="53"
            height="52"
            viewBox="0 0 53 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.1668 24.0065V25.9999C48.1642 30.6721 46.6513 35.2183 43.8537 38.9605C41.0562 42.7026 37.1239 45.4402 32.6434 46.765C28.1629 48.0897 23.3742 47.9307 18.9915 46.3115C14.6088 44.6923 10.8669 41.6998 8.32391 37.7802C5.78091 33.8606 4.57304 29.224 4.88046 24.5619C5.18788 19.8998 6.99411 15.4619 10.0298 11.9102C13.0654 8.35848 17.1679 5.8832 21.7252 4.85352C26.2826 3.82384 31.0507 4.29493 35.3185 6.19654"
              stroke="#13BC8E"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M48.1667 8.6665L26.5 30.3548L20 23.8548"
              stroke="#13BC8E"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Payment Successful</span>
        </h1>
        <div
          class="grid grid-cols-[116px_1fr] sm:grid-cols-[200px_1fr] gap-3 sm:gap-x-10 sm:px-[60px]"
        >
          <div class="text-center">
            <div class="aspect-w-16 aspect-h-10 rounded">
              <img
                :src="orderInfo.giftcard[0].template.image"
                alt=""
                class="rounded object-cover"
              />
            </div>
            <span class="text-lg font-bold sm:text-[24px] block mt-2">{{
              useFormatCurrency(orderInfo.giftcard[0].value)
            }}</span>
          </div>
          <div class="space-y-0.5 sm:text-lg">
            <p>{{ orderInfo.giftcard[0].shop.name }}</p>
            <p>
              <span class="font-medium">Send to:</span>
              {{
                orderInfo.giftcard[0].recipient_phone ||
                orderInfo.giftcard[0].recipient_email
              }}
            </p>
            <p>
              <span class="font-medium">From:</span>
              {{ orderInfo.giftcard[0].sender_phone }}
            </p>
          </div>
        </div>
        <div
          class="h-[1px] my-6 bg-[url('/src/assets/images/dashed-8A.svg')] bg-repeat-x bg-left-top"
        ></div>
        <div class="mb-12">
          <p class="text-lg sm:text-2xl font-bold mb-2">Transaction</p>
          <ul
            class="child:grid child:grid-cols-[3fr_4fr] child:gap-3 space-y-2 sm:text-lg"
          >
            <li>
              <span class="text-C8A">Payment method</span>
              <span
                class="text-right inline-flex justify-end items-center space-x-2 leading-none"
              >
                <!--              <img src="/src/assets/images/city-logo.svg" alt="" />-->
                <span>{{ orderInfo.payment.payment_data.source.brand }}</span>
                <span
                  >•••• •••• ••••
                  {{ orderInfo.payment.payment_data.source.last4 }}</span
                >
              </span>
            </li>
            <li>
              <span class="text-C8A">Transaction ID</span>
              <span class="text-right">{{ orderInfo.payment.payment_id }}</span>
            </li>
            <li>
              <span class="text-C8A">Date & time</span>
              <span class="text-right">{{ orderInfo.payment.created_at }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="container mt-auto max-w-[528px] sm:mt-0">
        <router-link :to="{ name: 'Home' }" class="btn btn-primary w-full">
          Back To home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGiftCardStore } from '@/stores/gift-card';
import { useRouter } from 'vue-router';
import { useFormatCurrency } from '@/utils/format';
import Banner from '@/components/Banner.vue';

const giftCardStore = useGiftCardStore();
const router = useRouter();

const orderInfo = computed<any>(() => giftCardStore.orderInfo);
if (!giftCardStore.orderInfo) {
  router.push({
    name: 'Home',
  });
}
</script>

<style scoped></style>
