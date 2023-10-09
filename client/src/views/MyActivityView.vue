<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-half">
        <div class="box title">
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
          <span>My Activity</span>
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
        </div>
        <!-- ActivityList can be used to show other user's Activities. We send ours here. -->
        <!-- TODO: userState lets you know if you're friends. -->
        <ActivityList :user="userState.currentUser" :userState="userState" />
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityList from '@/components/ActivityList.vue';
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
console.log("myactivityview", props.userState)
</script>

<style scoped>
.box.title {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: -1em;
  margin-right: -1em;
  text-align: center;
  border-radius: 34px;
  text-shadow: 1px 2px 0px #ffffff;
  background-color: #00d1b2;
  border-style: double;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.2em 0.3em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
</style>