<template>
  
  <div class="box user-list">
    <div class="title is-4">Friends</div>
    <SmallUserCard v-for="user in friends" :user="user" :fullWidth="true"/>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import { computed, type PropType } from 'vue';
import { useRoute } from 'vue-router';
import SmallUserCard from './SmallUserCard.vue';
const route = useRoute()
const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  }
});

const friends = computed(() => {
  const friendsIds = props.user.getFriendsIds(props.users);
  const friends = new Array<User>();
  friendsIds.forEach((friendId) => {
    const friend = props.users[friendId]
    if(friend == undefined) return;
    friends.push(friend);
  });
  return friends;
});

</script>

<style scoped>
.title{
  text-align: end;
}
</style>