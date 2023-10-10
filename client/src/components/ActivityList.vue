<template>
  <ActivityItem v-for="activity in sortedActivities" :user="props.user" :activity="activity" :userState="userState" :users="props.users"/>
</template>

<script setup lang="ts">
import {User, type Activity} from '@/components/User';
import ActivityItem from './ActivityItem.vue';
import { computed, type PropType } from 'vue';


const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  },
  users: {
    type: Array<User>,
    required: true,
  },
});

const sortedActivities = computed(() => {
  if(props.user.personalData.activities == undefined) return new Array<Activity>();
  return props.user.personalData.activities.sort((a: any, b: any) => {
    return parseInt(a.numDaysAgo) - parseInt(b.numDaysAgo);
  });
})
</script>

<style scoped></style>