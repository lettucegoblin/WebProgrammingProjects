<script setup lang="ts">
import { User } from '@/components/User';
import { computed, type PropType } from 'vue';
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
const isLoggedIn = computed(() => {
  return props.userState.currentUser.id != -1;
});
</script>

<template>

    <ProfileView v-if="isLoggedIn" :users="props.users" :user="userState.currentUser" :userState="props.userState"/>
    <div v-else>
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Welcome to the Fitness App!
            </h1>
            <h2 class="subtitle">
              Please log in or sign up to continue.
            </h2>
          </div>
        </div>
      </section>
    </div>
  
</template>
