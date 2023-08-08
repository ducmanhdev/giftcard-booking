<template>
  <div class="">
    <banner class="hidden sm:block"></banner>
    <div class="pb-8 sm:py-16">
      <div class="container max-w-[1016px]">
        <div class="py-4 sm:hidden">
          <router-link
            :to="{ name: 'Home' }"
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
            <span>Select Template</span>
          </router-link>
        </div>
        <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
          <div class="mb-7 sm:mb-0 sm:max-w-[440px]">
            <div class="relative">
              <div class="aspect-w-16 aspect-h-10 shadow rounded-lg">
                <img :src="image" alt="" class="object-cover rounded-lg" />
              </div>
              <div class="absolute top-0 right-0 text-center p-3 z-[2]">
                <img
                  :src="shopDetail.logo"
                  alt=""
                  class="w-[52px] h-[52px] block object-cover"
                />
              </div>
            </div>
          </div>
          <div class="space-y-8 :sm-space-y-12 sm:text-xl">
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                1. Enter your card value
                <span class="font-medium text-C8A">
                  (${{ MIN_VALUE }} to ${{ MAX_VALUE }})
                </span>
              </h2>
              <div>
                <div class="grid grid-cols-3 gap-2">
                  <div
                    v-for="item in valueList"
                    :key="item.value"
                    class="cursor-pointer border border-secondary rounded bg-white text-center flex justify-center items-center p-2 font-bold text-xl transition sm:h-16"
                    :class="{
                      '!border-primary !bg-primary/10':
                        item.value === data.value,
                    }"
                    @click="handleSelectValue(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
                <div class="mt-8">
                  <div class="relative mt-4">
                    <div
                      class="absolute bg-white px-2 left-8 -top-2 pointer-events-none leading-none"
                    >
                      Custom
                    </div>
                    <div
                      class="w-16 h-16 flex justify-center items-center text-center font-bold sm:font-medium text-4xl absolute top-0 left-0 p-1"
                    >
                      $
                    </div>
                    <input
                      type="number"
                      v-model="data.value"
                      @keypress="handleKeypressCustomValue"
                      :class="{ '!border-danger': formErrors.value }"
                      step="0.1"
                      class="text-center px-16 font-bold text-4xl appearance-none rounded-lg border-2 border-primary w-full h-16 outline-none py-3 bg-white text-C2F transition"
                    />
                    <p class="text-danger text-sm mt-2" v-if="formErrors.value">
                      {{ formErrors.value }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                Promotion Code
              </h2>
              <div class="space-y-4">
                <base-input
                  class="promotion-input"
                  v-model.trim="tempPromotionCode"
                  placeholder="YOURCODE"
                  :disabled="addPromotionCodeSuccess"
                >
                  <template #prefix>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20.75H7C2.59 20.75 1.25 19.41 1.25 15V14.5C1.25 14.09 1.59 13.75 2 13.75C2.96 13.75 3.75 12.96 3.75 12C3.75 11.04 2.96 10.25 2 10.25C1.59 10.25 1.25 9.91 1.25 9.5V9C1.25 4.59 2.59 3.25 7 3.25H17C21.41 3.25 22.75 4.59 22.75 9V10C22.75 10.41 22.41 10.75 22 10.75C21.04 10.75 20.25 11.54 20.25 12.5C20.25 13.46 21.04 14.25 22 14.25C22.41 14.25 22.75 14.59 22.75 15C22.75 19.41 21.41 20.75 17 20.75ZM2.75 15.16C2.77 18.6 3.48 19.25 7 19.25H17C20.34 19.25 21.15 18.66 21.24 15.66C19.81 15.32 18.75 14.03 18.75 12.5C18.75 10.97 19.82 9.68 21.25 9.34V9C21.25 5.43 20.57 4.75 17 4.75H7C3.48 4.75 2.77 5.4 2.75 8.84C4.18 9.18 5.25 10.47 5.25 12C5.25 13.53 4.18 14.82 2.75 15.16Z"
                        fill="#808080"
                      />
                      <path
                        d="M15 15.8799C14.44 15.8799 13.99 15.4299 13.99 14.8799C13.99 14.3299 14.44 13.8799 14.99 13.8799C15.54 13.8799 15.99 14.3299 15.99 14.8799C15.99 15.4299 15.56 15.8799 15 15.8799Z"
                        fill="#808080"
                      />
                      <path
                        d="M8.99999 10.8799C8.43999 10.8799 7.98999 10.4299 7.98999 9.87988C7.98999 9.32988 8.43999 8.87988 8.98999 8.87988C9.53999 8.87988 9.98999 9.32988 9.98999 9.87988C9.98999 10.4299 9.55999 10.8799 8.99999 10.8799Z"
                        fill="#808080"
                      />
                      <path
                        d="M8.62995 16.4296C8.43995 16.4296 8.24995 16.3596 8.09995 16.2096C7.80995 15.9196 7.80995 15.4396 8.09995 15.1496L14.8299 8.41965C15.1199 8.12965 15.5999 8.12965 15.8899 8.41965C16.1799 8.70965 16.1799 9.18965 15.8899 9.47965L9.15995 16.2096C9.01995 16.3596 8.81995 16.4296 8.62995 16.4296Z"
                        fill="#8A8A8A"
                      />
                    </svg>
                  </template>
                  <template #suffix>
                    <button
                      type="button"
                      class="text-lg font-bold text-primary"
                      :class="{ '!text-CD1': !tempPromotionCode }"
                      :disabled="
                        !tempPromotionCode ||
                        isAddPromotionCodeLoading ||
                        !!addPromotionCodeSuccess
                      "
                      @click="handleAddPromotionCode"
                    >
                      {{ isAddPromotionCodeLoading ? 'Checking' : 'Add' }}
                    </button>
                  </template>
                </base-input>
                <p class="mt-2 text-danger" v-if="addPromotionCodeError">
                  {{ addPromotionCodeError }}
                </p>
                <p class="mt-2 text-success" v-if="addPromotionCodeSuccess">
                  {{ addPromotionCodeSuccess }}
                </p>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                2. Choose a delivery method
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="method in deliveryMethods"
                  :key="method.name"
                  @click="handleSelectDeliveryMethod(method.value)"
                  :class="{
                    'border-primary text-primary font-bold bg-primary/10 transition':
                      method.value === data.delivery_id || method.value === 1,
                  }"
                  class="cursor-pointer relative flex flex-col justify-center items-center p-4 rounded-lg border border-CDF text-C8A bg-white mt-3 sm:text-2xl sm:pt-8"
                >
                  <svg
                    v-if="
                      method.value === data.delivery_id || method.value === 1
                    "
                    class="text-primary absolute -top-3 -right-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="currentColor" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.293 7.29292L10 13.5859L7.70704 11.2929C7.31466 10.9139 6.69096 10.9194 6.30522 11.3051C5.91949 11.6908 5.91407 12.3145 6.29304 12.7069L9.29304 15.7069C9.68354 16.0973 10.3165 16.0973 10.707 15.7069L17.707 8.70692C18.086 8.31454 18.0806 7.69083 17.6949 7.3051C17.3091 6.91937 16.6854 6.91395 16.293 7.29292Z"
                      fill="white"
                    />
                  </svg>
                  <span v-html="method.icon" class="sm:mb-1"></span>
                  <span>{{ method.name }}</span>
                </div>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">3. To</h2>
              <div class="space-y-4">
                <base-input
                  v-model.trim="data.recipient_name"
                  placeholder="Recipient Name"
                  :error="formErrors.recipient_name"
                >
                  <template #prefix>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1596 11.62C12.1296 11.62 12.1096 11.62 12.0796 11.62C12.0296 11.61 11.9596 11.61 11.8996 11.62C8.99957 11.53 6.80957 9.25 6.80957 6.44C6.80957 3.58 9.13957 1.25 11.9996 1.25C14.8596 1.25 17.1896 3.58 17.1896 6.44C17.1796 9.25 14.9796 11.53 12.1896 11.62C12.1796 11.62 12.1696 11.62 12.1596 11.62ZM11.9996 2.75C9.96957 2.75 8.30957 4.41 8.30957 6.44C8.30957 8.44 9.86957 10.05 11.8596 10.12C11.9096 10.11 12.0496 10.11 12.1796 10.12C14.1396 10.03 15.6796 8.42 15.6896 6.44C15.6896 4.41 14.0296 2.75 11.9996 2.75Z"
                        fill="#808080"
                      />
                      <path
                        d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
                        fill="#808080"
                      />
                    </svg>
                  </template>
                </base-input>
                <base-input
                  v-model.trim="data.recipient_email"
                  placeholder="Recipient Email"
                  :error="formErrors.recipient_email"
                >
                  <template #prefix>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H14C14.41 2.75 14.75 3.09 14.75 3.5C14.75 3.91 14.41 4.25 14 4.25H7C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V10.5C21.25 10.09 21.59 9.75 22 9.75C22.41 9.75 22.75 10.09 22.75 10.5V15.5C22.75 19.15 20.65 21.25 17 21.25Z"
                        fill="#808080"
                      />
                      <path
                        d="M11.9998 12.8698C11.1598 12.8698 10.3098 12.6098 9.65978 12.0798L6.52978 9.57978C6.20978 9.31978 6.14978 8.84978 6.40978 8.52978C6.66978 8.20978 7.13977 8.14978 7.45977 8.40978L10.5898 10.9098C11.3498 11.5198 12.6398 11.5198 13.3998 10.9098L14.5798 9.96978C14.8998 9.70978 15.3798 9.75977 15.6298 10.0898C15.8898 10.4098 15.8398 10.8898 15.5098 11.1398L14.3298 12.0798C13.6898 12.6098 12.8398 12.8698 11.9998 12.8698Z"
                        fill="#808080"
                      />
                      <path
                        d="M19.5 8.75C17.71 8.75 16.25 7.29 16.25 5.5C16.25 3.71 17.71 2.25 19.5 2.25C21.29 2.25 22.75 3.71 22.75 5.5C22.75 7.29 21.29 8.75 19.5 8.75ZM19.5 3.75C18.54 3.75 17.75 4.54 17.75 5.5C17.75 6.46 18.54 7.25 19.5 7.25C20.46 7.25 21.25 6.46 21.25 5.5C21.25 4.54 20.46 3.75 19.5 3.75Z"
                        fill="#808080"
                      />
                    </svg>
                  </template>
                </base-input>
                <Transition name="slide-from-bottom">
                  <base-input
                    v-model.trim="data.recipient_phone"
                    placeholder="Recipient Phone"
                    v-maska="['+1 (###) ##-####', '+1 (###) ###-####']"
                    v-if="data.delivery_id === 3"
                    :error="formErrors.recipient_phone"
                  >
                    <template #prefix>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                          fill="#808080"
                        />
                      </svg>
                    </template>
                  </base-input>
                </Transition>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                4. From
              </h2>
              <div class="space-y-4">
                <base-input
                  v-model.trim="data.sender_name"
                  placeholder="Sender Name"
                  :error="formErrors.sender_name"
                >
                  <template #prefix>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1596 11.62C12.1296 11.62 12.1096 11.62 12.0796 11.62C12.0296 11.61 11.9596 11.61 11.8996 11.62C8.99957 11.53 6.80957 9.25 6.80957 6.44C6.80957 3.58 9.13957 1.25 11.9996 1.25C14.8596 1.25 17.1896 3.58 17.1896 6.44C17.1796 9.25 14.9796 11.53 12.1896 11.62C12.1796 11.62 12.1696 11.62 12.1596 11.62ZM11.9996 2.75C9.96957 2.75 8.30957 4.41 8.30957 6.44C8.30957 8.44 9.86957 10.05 11.8596 10.12C11.9096 10.11 12.0496 10.11 12.1796 10.12C14.1396 10.03 15.6796 8.42 15.6896 6.44C15.6896 4.41 14.0296 2.75 11.9996 2.75Z"
                        fill="#808080"
                      />
                      <path
                        d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
                        fill="#808080"
                      />
                    </svg>
                  </template>
                </base-input>
                <base-input
                  v-model.trim="data.sender_phone"
                  placeholder="Sender Phone"
                  :error="formErrors.sender_phone"
                  v-maska="['+1 (###) ##-####', '+1 (###) ###-####']"
                >
                  <template #prefix>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                        fill="#808080"
                      />
                    </svg>
                  </template>
                </base-input>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                5. Choose a delivery date
              </h2>
              <div class="">
                <Datepicker
                  v-model.trim="data.delivery_date"
                  auto-apply
                  :min-date="dayjs().toDate()"
                  :format="DAYJS_DATE_FORMAT"
                  :preview-format="DAYJS_DATE_FORMAT"
                  now-button-label="Today"
                  show-now-button
                  model-type="format"
                  :enable-time-picker="false"
                >
                  <template #trigger>
                    <base-input
                      v-model="data.delivery_date"
                      :error="formErrors?.delivery_date"
                    >
                      <template #prefix>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                            fill="#808080"
                          />
                          <path
                            d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                            fill="#808080"
                          />
                          <path
                            d="M8.5 14.4998C8.37 14.4998 8.24 14.4698 8.12 14.4198C7.99 14.3698 7.89 14.2998 7.79 14.2098C7.61 14.0198 7.5 13.7698 7.5 13.4998C7.5 13.3698 7.53 13.2398 7.58 13.1198C7.63 12.9998 7.7 12.8898 7.79 12.7898C7.89 12.6998 7.99 12.6298 8.12 12.5798C8.48 12.4298 8.93 12.5098 9.21 12.7898C9.39 12.9798 9.5 13.2398 9.5 13.4998C9.5 13.5598 9.49 13.6298 9.48 13.6998C9.47 13.7598 9.45 13.8198 9.42 13.8798C9.4 13.9398 9.37 13.9998 9.33 14.0598C9.3 14.1098 9.25 14.1598 9.21 14.2098C9.02 14.3898 8.76 14.4998 8.5 14.4998Z"
                            fill="#808080"
                          />
                          <path
                            d="M12 14.4999C11.87 14.4999 11.74 14.4699 11.62 14.4199C11.49 14.3699 11.39 14.2999 11.29 14.2099C11.11 14.0199 11 13.7699 11 13.4999C11 13.3699 11.03 13.2399 11.08 13.1199C11.13 12.9999 11.2 12.8899 11.29 12.7899C11.39 12.6999 11.49 12.6299 11.62 12.5799C11.98 12.4199 12.43 12.5099 12.71 12.7899C12.89 12.9799 13 13.2399 13 13.4999C13 13.5599 12.99 13.6299 12.98 13.6999C12.97 13.7599 12.95 13.8199 12.92 13.8799C12.9 13.9399 12.87 13.9999 12.83 14.0599C12.8 14.1099 12.75 14.1599 12.71 14.2099C12.52 14.3899 12.26 14.4999 12 14.4999Z"
                            fill="#808080"
                          />
                          <path
                            d="M15.5 14.4999C15.37 14.4999 15.24 14.4699 15.12 14.4199C14.99 14.3699 14.89 14.2999 14.79 14.2099C14.75 14.1599 14.71 14.1099 14.67 14.0599C14.63 13.9999 14.6 13.9399 14.58 13.8799C14.55 13.8199 14.53 13.7599 14.52 13.6999C14.51 13.6299 14.5 13.5599 14.5 13.4999C14.5 13.2399 14.61 12.9799 14.79 12.7899C14.89 12.6999 14.99 12.6299 15.12 12.5799C15.49 12.4199 15.93 12.5099 16.21 12.7899C16.39 12.9799 16.5 13.2399 16.5 13.4999C16.5 13.5599 16.49 13.6299 16.48 13.6999C16.47 13.7599 16.45 13.8199 16.42 13.8799C16.4 13.9399 16.37 13.9999 16.33 14.0599C16.3 14.1099 16.25 14.1599 16.21 14.2099C16.02 14.3899 15.76 14.4999 15.5 14.4999Z"
                            fill="#808080"
                          />
                          <path
                            d="M8.5 18.0002C8.37 18.0002 8.24 17.9702 8.12 17.9202C8 17.8702 7.89 17.8002 7.79 17.7102C7.61 17.5202 7.5 17.2602 7.5 17.0002C7.5 16.8702 7.53 16.7402 7.58 16.6202C7.63 16.4902 7.7 16.3802 7.79 16.2902C8.16 15.9202 8.84 15.9202 9.21 16.2902C9.39 16.4802 9.5 16.7402 9.5 17.0002C9.5 17.2602 9.39 17.5202 9.21 17.7102C9.02 17.8902 8.76 18.0002 8.5 18.0002Z"
                            fill="#808080"
                          />
                          <path
                            d="M12 18.0002C11.74 18.0002 11.48 17.8902 11.29 17.7102C11.11 17.5202 11 17.2602 11 17.0002C11 16.8702 11.03 16.7402 11.08 16.6202C11.13 16.4902 11.2 16.3802 11.29 16.2902C11.66 15.9202 12.34 15.9202 12.71 16.2902C12.8 16.3802 12.87 16.4902 12.92 16.6202C12.97 16.7402 13 16.8702 13 17.0002C13 17.2602 12.89 17.5202 12.71 17.7102C12.52 17.8902 12.26 18.0002 12 18.0002Z"
                            fill="#808080"
                          />
                          <path
                            d="M15.5 17.9999C15.24 17.9999 14.98 17.8899 14.79 17.7099C14.7 17.6199 14.63 17.5099 14.58 17.3799C14.53 17.2599 14.5 17.1299 14.5 16.9999C14.5 16.8699 14.53 16.7399 14.58 16.6199C14.63 16.4899 14.7 16.3799 14.79 16.2899C15.02 16.0599 15.37 15.9499 15.69 16.0199C15.76 16.0299 15.82 16.0499 15.88 16.0799C15.94 16.0999 16 16.1299 16.06 16.1699C16.11 16.1999 16.16 16.2499 16.21 16.2899C16.39 16.4799 16.5 16.7399 16.5 16.9999C16.5 17.2599 16.39 17.5199 16.21 17.7099C16.02 17.8899 15.76 17.9999 15.5 17.9999Z"
                            fill="#808080"
                          />
                          <path
                            d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z"
                            fill="#808080"
                          />
                          <path
                            d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
                            fill="#808080"
                          />
                        </svg>
                      </template>
                    </base-input>
                  </template>
                </Datepicker>
                <p class="mt-2 text-C8A text-sm">Up to 6 months from today</p>
              </div>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-3 sm:text-2xl sm:mb-4">
                6. Write a message
              </h2>
              <div class="space-y-4">
                <base-textarea v-model.trim="data.message"></base-textarea>
              </div>
            </section>
          </div>
        </div>
        <div class="mt-8 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:mt-20">
          <router-link
            :to="{ name: 'Home' }"
            class="btn btn-outline-primary w-full hidden sm:flex"
            :class="{ disabled: isCreateLoading }"
          >
            Back
          </router-link>
          <button
            type="button"
            class="btn btn-primary w-full"
            @click="handleCreate"
            :disabled="isCreateLoading"
          >
            {{ isCreateLoading ? 'Submitting' : 'Review' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGiftCardStore } from '@/stores/gift-card';
import { useRouter, useRoute } from 'vue-router';
import { useValidateEmail, useValidatePhoneNumber } from '@/utils/validate';
import dayjs from 'dayjs';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import Banner from '@/components/Banner.vue';
import { notify } from '@kyvg/vue3-notification';

const giftCardStore = useGiftCardStore();
const shopDetail = computed(() => giftCardStore.shopDetail);

const router = useRouter();
const route = useRoute();
const DAYJS_DATE_FORMAT = 'MM/dd/yyyy';
const DATE_FORMAT = 'MM/DD/YYYY';
const MIN_VALUE = 10;
const MAX_VALUE = 200;

if (!route.params.id) {
  router.push({
    name: 'Home',
  });
}

const tempPromotionCode = ref('');
const addPromotionCodeSuccess = ref<string | null>(null);
const addPromotionCodeError = ref<string | null>(null);
const isAddPromotionCodeLoading = ref(false);
const handleAddPromotionCode = async () => {
  try {
    addPromotionCodeSuccess.value = null;
    addPromotionCodeError.value = null;
    isAddPromotionCodeLoading.value = true;
    const { code, discount_type, discount_value } =
      (await giftCardStore.checkPromotionCode(tempPromotionCode.value)) as any;
    const discountValue = `${discount_value}${
      discount_type === 'percent' ? '%' : 'USD'
    }`;
    addPromotionCodeSuccess.value = `The “${code}” code has been applied ${discountValue} OFF`;
    data.value.promotion_code = code;
  } catch (error: any) {
    console.error(error);
    addPromotionCodeError.value =
      error.message || 'The promotion code is invalid';
  } finally {
    isAddPromotionCodeLoading.value = false;
  }
};
const data = ref({
  value: 25,
  delivery_id: 1 as 1 | 3,
  delivery_date: dayjs().format(DATE_FORMAT),
  recipient_name: '',
  recipient_phone: '',
  recipient_email: '',
  sender_name: '',
  sender_phone: '',
  message: '',
  promotion_code: '',
});

if (
  giftCardStore.orderInfo &&
  giftCardStore.orderInfo.giftcard[0].template.id === Number(route.params.id) &&
  route.query['gift-again']
) {
  data.value = {
    value: giftCardStore.orderInfo.total,
    delivery_id: giftCardStore.orderInfo.giftcard[0].delivery_id,
    delivery_date: dayjs().format(DATE_FORMAT),
    recipient_name: giftCardStore.orderInfo.giftcard[0].recipient_name,
    recipient_phone: giftCardStore.orderInfo.giftcard[0].recipient_phone,
    recipient_email: giftCardStore.orderInfo.giftcard[0].recipient_email,
    sender_name: giftCardStore.orderInfo.giftcard[0].sender_name,
    sender_phone: giftCardStore.orderInfo.giftcard[0].sender_phone,
    message: giftCardStore.orderInfo.giftcard[0].message,
    promotion_code: giftCardStore.orderInfo.giftcard[0].promotion_code,
  };
} else if (
  giftCardStore.tempOrderInfo &&
  giftCardStore.tempOrderInfo.template.id === Number(route.params.id) &&
  route.query.edit
) {
  data.value = {
    value: giftCardStore.tempOrderInfo.value,
    delivery_id: giftCardStore.tempOrderInfo.delivery_id,
    delivery_date: giftCardStore.tempOrderInfo.delivery_date,
    recipient_name: giftCardStore.tempOrderInfo.recipient_name,
    recipient_phone: giftCardStore.tempOrderInfo.recipient_phone,
    recipient_email: giftCardStore.tempOrderInfo.recipient_email,
    sender_name: giftCardStore.tempOrderInfo.sender_name,
    sender_phone: giftCardStore.tempOrderInfo.sender_phone,
    message: giftCardStore.tempOrderInfo.message,
    promotion_code: giftCardStore.tempOrderInfo.promotion_code,
  };
}

const templateId = computed(() => route.params.id);
const image = computed(() => {
  const currenTemplate = giftCardStore.listTemplate.find(
    (item: any) => item.id === Number(templateId.value),
  );
  return currenTemplate?.image || null;
});
const valueList = ref([
  {
    label: '$25',
    value: 25,
  },
  {
    label: '$50',
    value: 50,
  },
  {
    label: '$75',
    value: 75,
  },
]);
const handleSelectValue = (value: number) => {
  data.value.value = value;
};

const handleKeypressCustomValue = (event: any) => {
  const key = event.keyCode;
  if (
    // !(key === 8 || (key >= 48 && key <= 57) || (key >= 1776 && key <= 1785))
    key === 101
  ) {
    return event.preventDefault();
  }
};

const deliveryMethods = ref([
  {
    name: 'BY EMAIL',
    icon: `<svg class="w-6 h-6 sm:w-8 sm:h-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.6667 28.3332H9.33342C4.46675 28.3332 1.66675 25.5332 1.66675 20.6665V11.3332C1.66675 6.4665 4.46675 3.6665 9.33342 3.6665H18.6667C19.2134 3.6665 19.6667 4.11984 19.6667 4.6665C19.6667 5.21317 19.2134 5.6665 18.6667 5.6665H9.33342C5.52008 5.6665 3.66675 7.51984 3.66675 11.3332V20.6665C3.66675 24.4798 5.52008 26.3332 9.33342 26.3332H22.6667C26.4801 26.3332 28.3334 24.4798 28.3334 20.6665V13.9998C28.3334 13.4532 28.7867 12.9998 29.3334 12.9998C29.8801 12.9998 30.3334 13.4532 30.3334 13.9998V20.6665C30.3334 25.5332 27.5334 28.3332 22.6667 28.3332Z" fill="currentColor"/>
              <path d="M15.9996 17.1602C14.8796 17.1602 13.7463 16.8135 12.8796 16.1069L8.70629 12.7735C8.27962 12.4269 8.19963 11.8002 8.54629 11.3735C8.89296 10.9469 9.51961 10.8669 9.94628 11.2135L14.1196 14.5469C15.133 15.3602 16.8529 15.3602 17.8663 14.5469L19.4396 13.2935C19.8663 12.9469 20.5063 13.0135 20.8396 13.4535C21.1863 13.8802 21.1196 14.5202 20.6796 14.8535L19.1063 16.1069C18.2529 16.8135 17.1196 17.1602 15.9996 17.1602Z" fill="currentColor"/>
              <path d="M26.0001 11.6667C23.6134 11.6667 21.6667 9.72 21.6667 7.33333C21.6667 4.94667 23.6134 3 26.0001 3C28.3867 3 30.3334 4.94667 30.3334 7.33333C30.3334 9.72 28.3867 11.6667 26.0001 11.6667ZM26.0001 5C24.7201 5 23.6667 6.05333 23.6667 7.33333C23.6667 8.61333 24.7201 9.66667 26.0001 9.66667C27.2801 9.66667 28.3334 8.61333 28.3334 7.33333C28.3334 6.05333 27.2801 5 26.0001 5Z" fill="currentColor"/>
          </svg>`,
    value: 1,
  },
  {
    name: 'BY SMS',
    icon: `<svg class="w-6 h-6 sm:w-8 sm:h-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3201 30.3733C12.5201 30.3733 11.7601 29.9733 11.2401 29.2667L9.6401 27.1333C9.6401 27.1467 9.57342 27.1066 9.54675 27.1066H9.05343C4.49343 27.1066 1.66675 25.8667 1.66675 19.72V14.3867C1.66675 8.77334 5.09343 7.30668 7.97343 7.05334C8.29343 7.01334 8.66676 7 9.05343 7H17.5868C22.4134 7 24.9734 9.56001 24.9734 14.3867V19.72C24.9734 20.1067 24.9601 20.48 24.9067 20.84C24.6667 23.68 23.2001 27.1066 17.5868 27.1066H17.0534L15.4001 29.2667C14.8801 29.9733 14.1201 30.3733 13.3201 30.3733ZM9.05343 9C8.74676 9 8.45342 9.01333 8.17342 9.04C5.08009 9.30666 3.66675 11 3.66675 14.3867V19.72C3.66675 24.2933 5.08009 25.1066 9.05343 25.1066H9.58675C10.1868 25.1066 10.8667 25.44 11.2401 25.92L12.8401 28.0666C13.1334 28.4667 13.5068 28.4667 13.8001 28.0666L15.4001 25.9333C15.7867 25.4133 16.4001 25.1066 17.0534 25.1066H17.5868C20.9734 25.1066 22.6668 23.68 22.9201 20.64C22.9601 20.32 22.9734 20.0267 22.9734 19.72V14.3867C22.9734 10.6667 21.3068 9 17.5868 9H9.05343Z" fill="currentColor"/>
              <path d="M13.3204 18.9201C12.5737 18.9201 11.9871 18.3201 11.9871 17.5868C11.9871 16.8534 12.5871 16.2534 13.3204 16.2534C14.0537 16.2534 14.6537 16.8534 14.6537 17.5868C14.6537 18.3201 14.0671 18.9201 13.3204 18.9201Z" fill="currentColor"/>
              <path d="M17.5865 18.9201C16.8398 18.9201 16.2532 18.3201 16.2532 17.5868C16.2532 16.8534 16.8532 16.2534 17.5865 16.2534C18.3198 16.2534 18.9198 16.8534 18.9198 17.5868C18.9198 18.3201 18.3198 18.9201 17.5865 18.9201Z" fill="currentColor"/>
              <path d="M9.06649 18.9201C8.31982 18.9201 7.73315 18.3201 7.73315 17.5868C7.73315 16.8534 8.33315 16.2534 9.06649 16.2534C9.79982 16.2534 10.3998 16.8534 10.3998 17.5868C10.3998 18.3201 9.79982 18.9201 9.06649 18.9201Z" fill="currentColor"/>
              <path d="M23.9203 21.7198C23.6536 21.7198 23.3869 21.6132 23.2003 21.4132C22.9869 21.1998 22.8936 20.8932 22.9336 20.5999C22.9736 20.3199 22.9869 20.0265 22.9869 19.7198V14.3865C22.9869 10.6665 21.3203 8.99984 17.6003 8.99984H9.06691C8.76024 8.99984 8.46695 9.01317 8.18695 9.03984C7.89361 9.07984 7.58692 8.97315 7.37359 8.77315C7.16026 8.55982 7.04024 8.26652 7.06691 7.97319C7.30691 5.09319 8.78691 1.6665 14.4002 1.6665H22.9336C27.7603 1.6665 30.3202 4.22652 30.3202 9.05318V14.3865C30.3202 19.9998 26.8936 21.4665 24.0136 21.7198C23.9736 21.7198 23.9469 21.7198 23.9203 21.7198ZM9.22694 6.99984H17.5869C22.4136 6.99984 24.9736 9.55985 24.9736 14.3865V19.5465C27.2403 18.9865 28.3069 17.3198 28.3069 14.3865V9.05318C28.3069 5.33318 26.6403 3.6665 22.9203 3.6665H14.3869C11.4536 3.6665 9.80028 4.73317 9.22694 6.99984Z" fill="currentColor"/>
          </svg>`,
    value: 3,
  },
]);
const handleSelectDeliveryMethod = (id: 1 | 3) => {
  if (id === 1) return;
  if (data.value.delivery_id === id) {
    data.value.delivery_id = 1;
  } else {
    data.value.delivery_id = id;
  }

  // reset
  if (data.value.delivery_id === 1) {
    formErrors.value.recipient_phone = null;
  }
};

const validateValue = () => {
  if (
    !data.value.value ||
    data.value.value < MIN_VALUE ||
    data.value.value > MAX_VALUE
  ) {
    return (formErrors.value.value = `The card value must be between ${MIN_VALUE} and ${MAX_VALUE}`);
  }
  return (formErrors.value.value = null);
};
const validateRecipientName = () => {
  if (!data.value.recipient_name) {
    return (formErrors.value.recipient_name = 'Recipient name is required!');
  }
  return (formErrors.value.recipient_name = null);
};
const validateRecipientPhone = () => {
  if (data.value.delivery_id === 1) {
    return (formErrors.value.recipient_phone = null);
  }
  if (!data.value.recipient_phone) {
    return (formErrors.value.recipient_phone = 'Recipient phone is required!');
  }
  if (!useValidatePhoneNumber(data.value.recipient_phone)) {
    return (formErrors.value.recipient_phone = 'Recipient phone is not valid!');
  }
  return (formErrors.value.recipient_phone = null);
};
const validateRecipientEmail = () => {
  if (!data.value.recipient_email) {
    return (formErrors.value.recipient_email = 'Recipient email is required!');
  }
  if (!useValidateEmail(data.value.recipient_email)) {
    return (formErrors.value.recipient_email = 'Recipient email is not valid!');
  }
  return (formErrors.value.recipient_email = null);
};
const validateSenderName = () => {
  if (!data.value.sender_name) {
    return (formErrors.value.sender_name = 'Sender name is required!');
  }
  return (formErrors.value.sender_name = null);
};
const validateSenderPhone = () => {
  if (!data.value.sender_phone) {
    return (formErrors.value.sender_phone = 'Sender phone is required!');
  }
  if (!useValidatePhoneNumber(data.value.sender_phone)) {
    return (formErrors.value.sender_phone = 'Sender phone is not valid!');
  }
  return (formErrors.value.sender_phone = null);
};
const validateDeliveryDate = () => {
  if (!data.value.delivery_date) {
    return (formErrors.value.delivery_date = 'Delivery Date is required!');
  }
  if (
    dayjs(data.value.delivery_date).diff(dayjs(), 'month') < 0 ||
    dayjs(data.value.delivery_date).diff(dayjs(), 'month') > 6
  ) {
    return (formErrors.value.delivery_date =
      'Delivery Date should up to 6 months from today!');
  }
  return (formErrors.value.delivery_date = null);
};

const formValidate = ref({
  value: validateValue,
  recipient_name: validateRecipientName,
  recipient_phone: validateRecipientPhone,
  recipient_email: validateRecipientEmail,
  sender_name: validateSenderName,
  sender_phone: validateSenderPhone,
  delivery_date: validateDeliveryDate,
});

const formErrors = ref({
  value: null as null | string,
  recipient_name: null as null | string,
  recipient_phone: null as null | string,
  recipient_email: null as null | string,
  sender_name: null as null | string,
  sender_phone: null as null | string,
  delivery_date: null as null | string,
});

watch(() => data.value.value, formValidate.value.value);
watch(() => data.value.recipient_name, formValidate.value.recipient_name);
watch(() => data.value.recipient_email, formValidate.value.recipient_email);
watch(() => data.value.recipient_phone, formValidate.value.recipient_phone);
watch(() => data.value.sender_name, formValidate.value.sender_name);
watch(() => data.value.sender_phone, formValidate.value.sender_phone);
watch(() => data.value.delivery_date, formValidate.value.delivery_date);

const isValid = computed(() =>
  (Object as any)
    .values(formErrors.value)
    .every((item: null | string) => !item),
);

const isCreateLoading = ref(false);
const handleCreate = async () => {
  (Object as any)
    .values(formValidate.value)
    .forEach((func: Function) => func());
  if (!isValid.value) return;
  try {
    isCreateLoading.value = true;
    await giftCardStore.createGiftCard({
      ...data.value,
      recipient_phone: data.value.recipient_phone.replace(/\D/g, ''),
      sender_phone: data.value.sender_phone.replace(/\D/g, ''),
      delivery_date: dayjs(data.value.delivery_date).format('YYYY-MM-DD'),
      template_id: Number(templateId.value),
      shop_id: 1,
    });
    await router.push({ name: 'Review' });
  } catch (error: any) {
    notify({
      duration: 2500,
      type: 'error',
      title: error.message || error,
    });
  } finally {
    isCreateLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
:deep {
  .promotion-input {
    input {
      padding-right: 100px;
    }

    .suffix {
      width: 100px;
    }
  }
}
</style>
