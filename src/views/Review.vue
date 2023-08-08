<template>
  <div class="pb-8 custom-h-screen flex flex-col">
    <banner class="hidden sm:block"></banner>
    <div class="container max-w-[1016px]">
      <div class="py-4 block sm:hidden">
        <router-link
          :to="{
            name: 'Custom',
            params: { id: tempOrderInfo.template_id },
            query: { edit: 'true' },
          }"
          class="flex items-center space-x-2.5 text-lg font-medium"
        >
          <svg
            class="shrink-0"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z"
              fill="currentColor"
            />
            <path
              d="M20.5 12.75H3.67004C3.26004 12.75 2.92004 12.41 2.92004 12C2.92004 11.59 3.26004 11.25 3.67004 11.25H20.5C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75Z"
              fill="currentColor"
            />
          </svg>
          <span>Edit Information</span>
        </router-link>
      </div>
      <div class="sm:py-[65px] sm:grid sm:grid-cols-2 sm:gap-x-[50px]">
        <div class="mb-7">
          <div class="relative">
            <div class="aspect-w-16 aspect-h-10 shadow rounded-lg">
              <img
                :src="tempOrderInfo.template.image"
                alt=""
                class="object-cover rounded-lg"
              />
            </div>
            <div class="absolute top-0 right-0 text-center p-3 z-[2]">
              <img
                :src="tempOrderInfo.shop.logo"
                alt=""
                class="w-[52px] h-[52px] block object-cover"
              />
            </div>
          </div>
        </div>
        <div class="text-lg sm:flex sm:flex-col">
          <div class="space-y-1.5 mb-3">
            <p>
              To:
              <span class="font-bold">{{ tempOrderInfo.recipient_name }}</span>
            </p>
            <p>
              From:
              <span class="font-bold">{{ tempOrderInfo.sender_name }}</span>
            </p>
          </div>
          <blockquote class="px-6 pt-9 relative mb-6 sm:text-[20px]">
            <svg
              class="absolute top-0 left-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3622 24V12.1412C14.3622 8.9098 15.2283 6.25882 16.9606 4.18824C18.6929 2.08627 21.0394 0.690196 24 0V5.27059C23.0866 5.55294 22.3465 5.89804 21.7795 6.30588C21.2126 6.71373 20.7717 7.2 20.4567 7.76471C20.1417 8.32941 19.937 8.98824 19.8425 9.74118C19.748 10.4627 19.7008 11.2627 19.7008 12.1412V13.4118H24V24H14.3622ZM0 24V12.1412C0 8.9098 0.866142 6.25882 2.59843 4.18824C4.33071 2.08627 6.67717 0.690196 9.6378 0V5.27059C8.72441 5.55294 7.98425 5.89804 7.41732 6.30588C6.85039 6.71373 6.40945 7.2 6.09449 7.76471C5.81102 8.32941 5.6063 8.98824 5.48031 9.74118C5.38583 10.4627 5.33858 11.2627 5.33858 12.1412V13.4118H9.6378V24H0Z"
                fill="#5669FF"
              />
            </svg>
            {{ tempOrderInfo.message }}
          </blockquote>
          <div
            class="bg-white text-body py-3 px-4 shadow-lg rounded-lg border mb-5 mt-auto"
          >
            <div
              class="flex justify-between items-center font-bold space-x-2 py-1 px-4 border border-dashed border-primary rounded-lg"
            >
              <span class="text-lg">Total Amount</span>
              <span class="text-2xl">{{
                tempOrderInfo?.order?.total
                  ? useFormatCurrency(tempOrderInfo?.order?.total)
                  : useFormatCurrency(tempOrderInfo?.value)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-auto sm:flex sm:gap-x-5 max-w-[1016px]">
      <router-link
        :to="{
          name: 'Custom',
          params: { id: tempOrderInfo.template_id },
          query: { edit: 'true' },
        }"
        class="btn btn-outline-primary w-full hidden sm:flex"
      >
        Back
      </router-link>
      <router-link :to="{ name: 'Checkout' }" class="btn btn-primary w-full">
        Checkout
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGiftCardStore } from '@/stores/gift-card';
import { useRouter } from 'vue-router';
import { useFormatCurrency } from '@/utils/format';
import Banner from '@/components/Banner.vue';

const router = useRouter();
const giftCardStore = useGiftCardStore();
const tempOrderInfo = computed(() => giftCardStore.tempOrderInfo);
if (!tempOrderInfo.value) {
  router.push({
    name: 'Home',
  });
}
</script>

<style scoped></style>
