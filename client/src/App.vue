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
const testUser = new User(dataGenerated.users[0]);
console.log("IsAdmin", testUser.isAdmin, "Handle", testUser.personalData.online_handle)

// make dataGen available to all components
const dataGen = ref(dataGenerated);

// print out all admins
const admins = dataGen.value.users.filter(user => user.isAdmin == "true");
console.log("Admins: ", admins);

const users = [
  {
    id: 1,
    personalData: { firstName: '', lastName: '', emails: [], handle: '' },
    activities: [{ date: "", workout: { type: 'run/bike/walk/cardio/strength', distance: 0, duration: 0, avgPace: 0, calories: 0, location: "" } }],
    isAdmin: false
  }
]


</script>

<template>
  <header>
    <NavBar :dataGen="dataGen" />
  </header>

  <RouterView class="container" /> <!-- Where the pages are inserted -->
</template>

<style scoped></style>
@/User.vue