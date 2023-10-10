<template>
  <div>
    <div class="title">😎 What's up, this is the admin users view 😎</div>
    <!-- List of users rows with columns for each field of personalDetails -->
    <!-- columns: profile picture, First Name,	Last Name,	Emails,	Handle, Is Admin, Buttons	-->
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Emails</th>
          <th>Handle</th>
          <th>Is Admin</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in props.users">
          <th>profile picture</th>
          <td>{{ user.personalData.firstName }}</td>
          <td>{{ user.personalData.lastName }}</td>
          <td>{{ user.personalData.emails }}</td>
          <td>{{ user.personalData.online_handle }}</td>
          <td>{{ user.isAdmin }}</td>
          <td><button class="button">edit</button><button class="button is-warning">x</button></td>
        </tr>

      </tbody>

    </table>
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

<style scoped>
.table tbody {
  word-break: break-word;
}
.title {
  text-align: center;
}
</style>