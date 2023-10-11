<template>
  <img :src="profilePhoto">
</template>

<script setup lang="ts">
import { computed } from 'vue';

const profilePhoto = computed<string>(() => {
  return new URL(`/src/assets/profile_photos/${props.userId+1}.jpg`, import.meta.url).href;
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