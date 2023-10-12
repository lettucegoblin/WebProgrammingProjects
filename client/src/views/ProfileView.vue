<template>
  <main>
    <div class="columns">
      <div class="column">
        <div v-if="user == userState.currentUser">
          <button v-if="editMode" class="edit-button button is-fullwidth is-outlined is-success"
            @click="editMode = !editMode">Save</button>
          <button v-else class="edit-button button is-fullwidth is-outlined is-danger"
            @click="editMode = !editMode">Edit</button>
        </div>
        <ProfileItem :user="user" :userState="userState" :users="users" :editMode="editMode" />
      </div>
      <div class="column is-half">
        <RouterLink :to="{ name: 'activity', params: { id: user.id } }">
          <button class="button is-large is-fullwidth is-outlined is-primary">View All Activities</button>
        </RouterLink>
        <SimpleStatistic :user="user" />
      </div>
      <div class="column">
        <FriendsList :user="user" :users="users" :userState="userState" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SimpleStatistic from '../components/SimpleStatistic.vue'
import { User } from '@/components/User';
import ProfileItem from '@/components/ProfileItem.vue';
import { computed, ref, type PropType } from 'vue';
import { useRoute } from 'vue-router';
import FriendsList from '@/components/FriendsList.vue';

const route = useRoute()
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
const editMode = ref(route.name == "editprofile");

const user = computed(() => {
  if (route.params.id && typeof route.params.id == 'string') {
    let id = parseInt(route.params.id);
    if (isNaN(id) || id > props.users.length || id < 0) {
      return props.userState.currentUser
    }
    return props.users[id];
  } else {
    return props.userState.currentUser
  }
})
</script>

<style scoped>
.edit-button {
  margin-bottom: 0.2rem;
}
</style>