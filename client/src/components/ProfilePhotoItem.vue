<template>
  <img :src="profilePhoto" onerror="this.onerror=null; this.src='/src/assets/profile_photos/p_Default.webp'">
</template>

<script setup lang="ts">
import { computed } from 'vue';
const defaultPath = '/src/assets/profile_photos/'

const onError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'p_Default.webp';
}

const profilePhoto = computed<string>(() => {
  return new URL(`${defaultPath}p_${props.userId+1}.webp`, import.meta.url).href;
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