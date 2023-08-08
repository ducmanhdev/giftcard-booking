<template>
  <div>
    <div class="relative" :class="{ 'pointer-events-none opacity-75': disabled }">
      <div
        v-if="slots.prefix"
        class="prefix absolute top-0 left-0 z-10 w-[52px] h-[52px] sm:w-16 sm:h-16 rounded-l-lg flex justify-center items-center p-1 overflow-hidden"
      >
        <slot name="prefix"></slot>
      </div>
      <select
        v-bind="attrs"
        :class="{
          'pl-[52px] sm:pl-16': slots.prefix,
          '!border-danger': error,
        }"
        class="block appearance-none rounded-lg border border-secondary w-full h-[52px] sm:h-16 outline-none py-3 px-5 bg-white text-C2F transition focus:border-primary pr-[52px] sm:pr-16"
        v-model="value"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div
        class="suffix absolute top-0 right-0 z-10 w-[52px] h-[52px] sm:w-16 sm:h-16 rounded-r-lg flex justify-center items-center p-1 overflow-hidden"
      >
        <slot name="suffix">
          <svg
            width="32"
            height="26"
            viewBox="0 0 32 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10L16 16L22 10"
              stroke="#DFE3FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </div>
    </div>
    <p class="mt-2 text-sm text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots } from 'vue';

const attrs = useAttrs();
const slots = useSlots();
const props = defineProps<{
  modelValue: any;
  options: {
    label: string;
    value: any;
  }[];
  error?: string | null | undefined;
  disabled?: any;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', newValue: any): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});
</script>
