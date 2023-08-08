<template>
  <section>
    <h2 class="text-lg font-bold sm:text-xl">{{ title }}</h2>
    <ul class="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-4 sm:gap-5 sm:mt-3">
      <li v-for="item in items" :key="item.id">
        <router-link
          :to="{ name: 'Custom', params: { id: item.id } }"
          class="block rounded-lg shadow aspect-w-[279] aspect-h-[179]"
        >
          <img
            :src="item.image"
            onerror="this.onerror=null;this.src=`/src/assets/images/placeholder.png`"
            alt=""
            class="block w-full h-full rounded-lg object-cover"
          />
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  items: any[];
}>();
</script>

<style scoped></style>
