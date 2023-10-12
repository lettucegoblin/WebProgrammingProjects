<template>
  <img :src="profilePhoto" :onerror="onError">
</template>

<script setup lang="ts">
import { computed } from 'vue';

const onError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = new URL(`/src/assets/profile_photos/p_Default.webp`, import.meta.url).href;
}

const profilePhoto = computed<string>(() => {
  return new URL(`/src/assets/profile_photos/p_${props.userId+1}.webp`, import.meta.url).href;
})
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  }
});
</script>

<style scoped>

</style>