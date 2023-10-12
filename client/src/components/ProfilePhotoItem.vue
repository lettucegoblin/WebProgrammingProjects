<template>
  <img :src="profilePhoto" onerror="this.onerror=null; this.src='/src/assets/profile_photos/Default.jpg'">
</template>

<script setup lang="ts">
import { computed } from 'vue';
const defaultPath = '/src/assets/profile_photos/'

const onError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'Default.jpg';
}

const profilePhoto = computed<string>(() => {
  return new URL(`${defaultPath}${props.userId+1}.jpg`, import.meta.url).href;
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