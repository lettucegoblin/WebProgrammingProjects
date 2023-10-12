<template>
  <img :src="activitiesPhotos" :onerror="onError">
</template>

<script setup lang="ts">
import { computed } from 'vue';
const onError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = new URL(`/src/assets/activities_photos/Default.webp`, import.meta.url).href;
}

const activitiesPhotos = computed<string>(() => {
  return new URL(`/src/assets/activities_photos/${props.userId}_${props.activityIndex}.webp`, import.meta.url).href;
})
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  activityIndex: {
    type: Number,
    required: true,
  }
});
</script>

<style scoped>

</style>