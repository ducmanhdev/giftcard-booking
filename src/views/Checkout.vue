<template>
  <div class="sm:py-9">
    <div class="container max-w-[1016px]">
      <div class="py-4 block sm:hidden">
        <router-link
          :to="{
            name: 'Review',
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
          <span>Checkout</span>
        </router-link>
      </div>
      <h2 class="text-2xl font-bold mb-4 hidden sm:block">Checkout</h2>
      <base-loading class="mb-4" v-if="isLoading"></base-loading>
      <base-error class="mb-4" :message="error" v-if="error"></base-error>
      <form v-show="!isLoading && !error" id="payment-form" class="space-y-4">
        <div class="">
          <div
            id="card-number"
            class="field"
            :class="{
              'has-error':
                cardEvent?.CARD_NUMBER?.error || cardErrors?.CARD_NUMBER,
            }"
          ></div>
          <div class="input-errors" id="card-number-errors" role="alert">
            {{ cardEvent?.CARD_NUMBER?.error || cardErrors?.CARD_NUMBER }}
          </div>
        </div>
        <div class="">
          <div
            id="card-date"
            class="field"
            :class="{
              'has-error': cardEvent?.CARD_DATE?.error || cardErrors?.CARD_DATE,
            }"
          ></div>
          <div class="input-errors" id="card-date-errors" role="alert">
            {{ cardEvent?.CARD_DATE?.error || cardErrors?.CARD_DATE }}
          </div>
        </div>
        <div class="">
          <div
            id="card-cvv"
            class="field"
            :class="{
              'has-error': cardEvent?.CARD_CVV?.error || cardErrors?.CARD_CVV,
            }"
          ></div>
          <div class="input-errors" id="card-cvv-errors" role="alert">
            {{ cardEvent?.CARD_CVV?.error || cardErrors?.CARD_CVV }}
          </div>
        </div>
        <div class="">
          <div
            id="card-postal-code"
            class="field"
            :class="{
              'has-error':
                cardEvent?.CARD_POSTAL_CODE?.error ||
                cardErrors?.CARD_POSTAL_CODE,
            }"
          ></div>
          <div class="input-errors" id="card-postal-code-errors" role="alert">
            {{
              cardEvent?.CARD_POSTAL_CODE?.error || cardErrors?.CARD_POSTAL_CODE
            }}
          </div>
        </div>
        <div
          class="bg-white text-body py-3 px-4 rounded-lg border mb-5"
          v-if="tempOrderInfo?.value"
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
        <div class="sm:flex sm:gap-x-5">
          <router-link
            :to="{
              name: 'Review',
            }"
            class="btn btn-outline-primary w-full hidden sm:flex"
            :class="{ disabled: isSubmitLoading }"
          >
            Back
          </router-link>
          <button
            class="btn btn-primary w-full"
            :disabled="isLoading || error || isSubmitLoading"
          >
            {{ isSubmitLoading ? 'Submitting' : 'Submit Payment' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGiftCardStore } from '@/stores/gift-card';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseError from '@/components/base/BaseError.vue';
import { useRouter } from 'vue-router';
import { useFormatCurrency } from '@/utils/format';
import { notify } from '@kyvg/vue3-notification';


const router = useRouter();
const giftCardStore = useGiftCardStore();
const tempOrderInfo = computed(() => giftCardStore.tempOrderInfo);
if (!tempOrderInfo.value) {
  router.push({
    name: 'Home',
  });
}

interface CardEventDetail {
  error?: string;
  touched: boolean;
}
interface CardEvent {
  CARD_NUMBER: CardEventDetail;
  CARD_DATE: CardEventDetail;
  CARD_CVV: CardEventDetail;
  CARD_POSTAL_CODE: CardEventDetail;
}
interface CardErrors {
  CARD_NUMBER: string;
  CARD_DATE: string;
  CARD_CVV: string;
  CARD_POSTAL_CODE: string;
}

const cardEvent = ref<CardEvent | null>(null);
const cardErrors = ref<CardErrors | null>(null);
const isSubmitLoading = ref(false);
const handleSubmit = async (token: string) => {
  try {
    isSubmitLoading.value = true;
    await giftCardStore.payment(token);
    router.push({
      name: 'Success',
    });
  } catch (error: any) {
    // alert(error.message);
    notify({
      duration: 2500,
      type: 'error',
      title: error.message || error,
    });
  } finally {
    isSubmitLoading.value = false;
  }
};
const handleGetCardEvent = (event: any) => {
  cardEvent.value = event;
};

const isLoading = ref(false);
const error = ref<any>(null);

onMounted(async () => {
  try {
    error.value = null;
    isLoading.value = true;
    const apiAccessKey: any = await giftCardStore.getAccessKey();
    const clover = new Clover(apiAccessKey);
    const elements = clover.elements();
    const styles = {
      input: {
        fontSize: '16px',
        appearance: 'none',
        outline: 'none',
        width: '100%',
        borderRadius: '8px',
        height: '52px',
        padding: '12px 20px',
        backgroundColor: '#FFF',
        color: '#2F2C35',
      },
    };
    const form = document.getElementById('payment-form') as HTMLFormElement;
    const cardNumber = elements.create('CARD_NUMBER', styles);
    const cardDate = elements.create('CARD_DATE', styles);
    const cardCvv = elements.create('CARD_CVV', styles);
    const cardPostalCode = elements.create('CARD_POSTAL_CODE', styles);

    cardNumber.mount('#card-number');
    cardDate.mount('#card-date');
    cardCvv.mount('#card-cvv');
    cardPostalCode.mount('#card-postal-code');

    cardNumber.addEventListener('change', handleGetCardEvent);
    cardNumber.addEventListener('blur', handleGetCardEvent);
    cardDate.addEventListener('change', handleGetCardEvent);
    cardDate.addEventListener('blur', handleGetCardEvent);
    cardCvv.addEventListener('change', handleGetCardEvent);
    cardCvv.addEventListener('blur', handleGetCardEvent);
    cardPostalCode.addEventListener('change', handleGetCardEvent);
    cardPostalCode.addEventListener('blur', handleGetCardEvent);

    form.addEventListener('submit', async (event: any) => {
      event.preventDefault();
      const result = await clover.createToken();
      if (result.errors) {
        return (cardErrors.value = result.errors);
      }
      handleSubmit(result.token);
    });
  } catch (err: any) {
    error.value = err.message || error;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
:deep {
  iframe {
    width: 100% !important;
    height: 52px !important;
    box-sizing: border-box !important;
  }
  .field {
    position: relative;
    border: 1px solid #dfe3ff;
    border-radius: 8px;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    &:focus,
    &:focus-within {
      border-color: #5669ff;
    }
    &.has-error,
    &.has-error:focus {
      border-color: #ef476f;
    }
  }
  [role='alert'] {
    color: #ef476f;
    margin-top: 4px;
    font-size: 14px;
  }
}
</style>
