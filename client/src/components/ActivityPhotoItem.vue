<template>
  <img :src="activitiesPhotos" onerror="this.onerror=null; this.src='/src/assets/activities_photos/Default.webp'">
</template>

<script setup lang="ts">
import { computed } from 'vue';

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