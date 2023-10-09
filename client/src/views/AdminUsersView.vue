<template>
  <div>
    😎 What's up, this is the admin users view 😎
  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import type { PropType } from 'vue';
const props = defineProps({
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  }
});
</script>

<style scoped></style>