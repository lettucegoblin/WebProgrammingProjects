<script setup lang="ts">
import SimpleStatistic from '../components/SimpleStatistic.vue'
import { User } from '@/components/User';
const props = defineProps({
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  }
});
//console.log("homeview", props.userState)
</script>

<template>
  <main>
    <SimpleStatistic :user="props.userState.currentUser" />
  </main>
</template>
