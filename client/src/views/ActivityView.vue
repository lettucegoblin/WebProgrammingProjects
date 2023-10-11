<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-half">
        <div class="box title">
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
          <div>
            <h1 class="title is-3">{{ activityTitle }}</h1>
            <h3 class="subtitle" v-if="isFriendsActivityList">
              <span class="icon"><i class="fas fa-user-friends"></i></span>
              {{ props.userState.currentUser.getName() }} Friends
              <span class="icon"><i class="fas fa-user-friends"></i></span>
          </h3>
            <h3 class="subtitle" v-else-if="!isUserParam">Activity Log</h3>
          </div>
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
        </div>
        <button v-if="!isFriendsActivityList && isUserParam" class="add-workout button is-info is-fullwidth">Add Workout(TODO)</button>
        <!-- ActivityList can be used to show other user's Activities. We send ours here. -->
        <!-- TODO: userState lets you know if you're friends. -->
        <ActivityList :isFriendsActivityList="isFriendsActivityList" :user="userFromParam" :userState="userState" :users="props.users" />
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityList from '@/components/ActivityList.vue';
import { User } from '@/components/User';
import { computed, type PropType } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
//console.log(route.params.id, route.name)
const props = defineProps({
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  },
});
console.log("activityView", props);

const isFriendsActivityList = computed(() => {
  return route.name == "friendsactivity"
})

const activityTitle = computed(() => {
  if(isFriendsActivityList.value) {
    return "Friends Activity"
  } else if (userFromParam.value != props.userState.currentUser) {
    return userFromParam.value.getName()
  } else {
    return "My Activity"
  }
});

const isUserParam = computed(() => {
  return userFromParam.value == props.userState.currentUser;
})

const userFromParam = computed<User>(() => {
  //console.log("userFromParam", props.userState)
  if (route.params.id && typeof route.params.id == 'string') {
    let id = parseInt(route.params.id);
    if (isNaN(id) || id > props.users.length || id < 0) {
      return props.userState.currentUser
    }
    return props.users[id];
  } else {
    return props.userState.currentUser
  }
});

//console.log("activityview", props.userState)
</script>

<style scoped>
.add-workout {
  margin-bottom: 1em;
}

.box.title {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: -1em;
  margin-right: -1em;
  text-align: center;
  background-color: #00d1b2;
  border-style: double;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.2em 0.3em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}

.box.title .icon {
  text-shadow: 1px 1px 1px #ffffff;
}
</style>