<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

// add reactive variables here

// user data First Name	Last Name	Emails	Handle	Is Admin

// AI generated personalDetails
import dataGenerated from '@/assets/dataGenerated.json';
/*  Structure of dataGen:
{
  users: [
    {
      "personalData": {
        "firstName": "string",
        "lastName": "string",
        "genderIdentity": "string",
        "age": "string",
        "height": "string",
        "weight_class": "string",
        "weight": "string",
        "online_handle": "string",
        "aboutMe": "string",
        "oneAdjectiveToDescribeMe": "string",
        "emails": [
          "string",
          "string"
        ]
        "activities": [
          {
            "type": "[WORKOUT_VALUE]",
            "wasDifficult": "[BOOLEAN_VALUE]",
            "avgHeartRate": "[INT_VALUE]",
            "distanceInMeters": "{randomNumberAsString(1, 16000)}",
            "reps": "{randomNumberAsString(0, 40)}",
            "sets": "{randomNumberAsString(1, 20)}",
            "weightInPounds": "{randomNumberAsString(1, 250)}",
            "durationInMinutes": "{randomNumberAsString(1, 60*3)}",
            "location": "[STRING_VALUE]",
            "notes": "[STRING_VALUE]",
            "numOfComments": "{randomNumberAsString(0, 4)}",
            "numOfLikes": "[INT_VALUE]",
            "comments": [
              {
                "author_id": "{author["id"]}",
                "author": "{author["personalData"]["online_handle"]}",
                "comment": "[STRING_VALUE]",
                "isLookingForReplyFromAuthor": "[BOOLEAN_VALUE]",
                "numOfLikes": "[INT_VALUE]"
              }, ...
            ]
          }, ...
        ]
      },
      "isAdmin": "boolean"
    }, ...
  ]
}

*/

console.log(dataGenerated);

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
