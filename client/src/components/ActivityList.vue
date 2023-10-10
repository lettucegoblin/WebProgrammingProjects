<template>
  <ActivityItem v-if="isFriendsActivityList" v-for="activityObj in sortedFriendsActivities" :user="activityObj.user" :activity="activityObj.activity" :userState="userState" :users="props.users"/>
  <ActivityItem v-else v-for="activity in sortedActivities" :user="props.user" :activity="activity" :userState="userState" :users="props.users"/>
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
  isFriendsActivityList: {
    type: Boolean,
    required: true,
  }
});

// activities of all of user's friends(people who have commented on their posts)
// sorted by most recent
const sortedFriendsActivities = computed(() => {
  const friendsIds = props.user.getFriendsIds();
  console.log('friendsIds', friendsIds);
  const friendActivities = new Array<{activity:Activity, user:User}>();
  // for each friend, get their activities and add them to friendActivities
  friendsIds.forEach((friendId) => {
    const friend = props.users[friendId]
    if(friend == undefined) return;
    friendActivities.push(...friend.personalData.activities.map((activity:Activity) => {
      return {activity:activity, user:friend}
    }));
  });
  return friendActivities.sort((a: any, b: any) => {
    return parseInt(a.numDaysAgo) - parseInt(b.numDaysAgo);
  });
});

const sortedActivities = computed(() => {
  if(props.user.personalData.activities == undefined) return new Array<Activity>();
  return props.user.personalData.activities.sort((a: any, b: any) => {
    return parseInt(a.numDaysAgo) - parseInt(b.numDaysAgo);
  });
})
</script>

<style scoped></style>