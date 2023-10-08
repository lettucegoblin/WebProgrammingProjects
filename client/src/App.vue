<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

// add reactive variables here

// user data First Name	Last Name	Emails	Handle	Is Admin

// AI generated personalDetails
import dataGenerated from '@/assets/dataGenerated.json';


// conform the array of any type users in dataGen to the User class
//dataGenerated.users = dataGenerated.users.map(user => new User(user));

console.log(dataGenerated);

import User from '@/components/User'


// make dataGen available to all components
const users = ref(dataGenerated.users.map(user => new User(user)));

// print out all admins
//const admins = users.value.filter(user => user.isAdmin);
//console.log("Admins: ", admins);
const guestUser = new User({
  id: -1,
  personalData: {
    first_name: "Guest",
    last_name: "",
  }, is_admin: false
});

const currentUser = ref<User>({ ...guestUser });

const logIn = (user: User) => {
  console.log("Log in as: ", user.personalData.online_handle)
  currentUser.value = user;
  console.log("currentUser", currentUser.value.personalData.online_handle)
}

</script>

<template>
  <header>
    <NavBar @logIn="logIn" :users="users" :currentUser="currentUser" />
  </header>

  <RouterView class="container" /> <!-- Where the pages are inserted -->
</template>

<style scoped></style>
@/User.vue