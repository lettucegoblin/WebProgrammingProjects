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

//console.log(dataGenerated);

import { User } from '@/components/User'


// make dataGen available to all components
const users = ref(dataGenerated.users.map(user => new User(user)));

// print out all admins
//const admins = users.value.filter(user => user.isAdmin);
//console.log("Admins: ", admins);
const guestUser: User = new User({
  id: -1,
  personalData: {
    first_name: "Guest",
    last_name: "",
  }, is_admin: false
});

const userState = ref({
  currentUser: guestUser
});

userState.value.currentUser = users.value[23];
//console.log("Temporarily Logging in by default as: ", userState.value.currentUser.personalData.online_handle)


const logIn = (user: User) => {
  //console.log("Log in as: ", user.personalData.online_handle)
  userState.value.currentUser = user;
  //console.log("currentUser", userState.value.currentUser.personalData.online_handle)
}
const logOut = () => {
  //console.log("Log out")
  userState.value.currentUser = guestUser;
  //console.log("currentUser", userState.value.currentUser.personalData.online_handle)
}

</script>

<template>
  <header>
    <NavBar @logIn="logIn" @logOut="logOut" :users="users" :userState="userState" />
  </header>

  <RouterView class="App container" :users="users" :userState="userState" /> <!-- Where the pages are inserted -->
</template>

<style scoped>
.App {
  margin-top: 2rem;
}
</style>
