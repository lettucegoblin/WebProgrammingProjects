<script setup lang="ts">
import { User } from '@/components/User';
import type { PropType } from 'vue';
import ProfileView from './ProfileView.vue';

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
console.log("homeview", props);
</script>

<template>

    <ProfileView :users="props.users" :user="userState.currentUser" :userState="props.userState"/>
  
</template>
