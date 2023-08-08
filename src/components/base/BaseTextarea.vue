<template>
  <div>
    <div class="relative" :class="{ 'pointer-events-none opacity-75': disabled }">
      <div
        v-if="slots.prefix"
        class="prefix absolute top-0 left-0 z-10 w-[52px] h-[52px] sm:w-16 sm:h-16 rounded-l-lg flex justify-center items-center p-1 overflow-hidden"
      >
        <slot name="prefix"></slot>
      </div>
      <textarea
        v-bind="attrs"
        :class="{
          'pl-[52px] sm:pl-16': slots.prefix,
          'pr-[52px] sm:pr-16': slots.suffix,
          '!border-danger': error,
        }"
        class="block appearance-none rounded-lg border border-secondary w-full h-[75px] sm:h-[100px] outline-none py-3 px-5 bg-white text-C2F transition focus:border-primary resize-none"
        :placeholder="placeholder"
        v-model="value"
      />
      <div
        v-if="slots.suffix"
        class="suffix absolute top-0 right-0 z-10 w-[52px] h-[52px] sm:w-16 sm:h-16 rounded-r-lg flex justify-center items-center p-1 overflow-hidden"
      >
        <slot name="suffix"></slot>
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
  placeholder?: string;
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
