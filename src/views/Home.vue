<template>
  <div>
    <banner></banner>
    <div class="py-8 sm:py-16">
      <div class="container">
        <gift-again></gift-again>
        <div class="mb-8 sm:grid sm:grid-cols-4 sm:items-center sm:gap-5">
          <p class="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            Select Template eGift
          </p>
          <base-select
            v-model="categorySelected"
            :options="categoriesOptions"
            class="font-medium sm:col-span-2"
          ></base-select>
        </div>
        <TransitionGroup name="list" tag="div" class="space-y-8 sm:space-y-12">
          <template-category
            v-for="item in listTemplateCategoriesFiltered"
            :key="item.value"
            :title="item.label"
            :items="item.items"
          >
          </template-category>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGiftCardStore } from '@/stores/gift-card';
import { TEMPLATE_CATEGORIES } from '@/constants';
import Banner from '@/components/Banner.vue';
import TemplateCategory from '@/components/TemplateCategory.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import GiftAgain from '@/components/GiftAgain.vue';

const giftCardStore = useGiftCardStore();
const categoriesOptions = [
  {
    label: 'All eGift',
    value: 0,
  },
  ...(Object as any).values(TEMPLATE_CATEGORIES),
];
const categorySelected = ref(categoriesOptions[0].value);
const listTemplate = computed<any[]>(() => giftCardStore.listTemplate);
const listTemplateCategories = computed(() => {
  return (Object as any).values(TEMPLATE_CATEGORIES).map((category: any) => ({
    ...category,
    items: listTemplate.value.filter(
      (template: any) => template.category_id === category.value,
    ),
  }));
});
const listTemplateCategoriesFiltered = computed(() => {
  if (categorySelected.value === 0) {
    return listTemplateCategories.value;
  }
  return listTemplateCategories.value.filter(
    (item: any) => item.value === categorySelected.value,
  );
});
</script>
