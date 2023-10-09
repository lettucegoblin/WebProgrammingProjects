<script setup lang="ts">
import { computed } from 'vue';
import { User } from '@/components/User';
// We're sent the user object from the parent component
const props = defineProps(['user', 'activity'])
console.log(props.activity)

// Time of (now - numDaysAgo)
const getFormatedTimeString = (numDaysAgo: number) => {
  const now = new Date();
  const time = new Date(now.getTime() - numDaysAgo * 24 * 60 * 60 * 1000);
  return time.toLocaleDateString();
}

const timeString = computed(() => {
  return getFormatedTimeString(props.activity.numDaysAgo);
})

const distanceInFeet = computed(() => {
  return Math.floor(props.activity.distanceInMeters * 3.28084);
})

const distanceOutput = computed(() => {
  // if distance is greater than or equal to a mile display in miles otherwise display in feet
  if (props.activity.distanceInMeters >= 1609.34) {
    const distanceInMiles = props.activity.distanceInMeters / 1609.34;
    const milesString = distanceInMiles === 1 ? 'mile' : 'miles';
    return `${distanceInMiles.toFixed(2)} ${milesString}`;
  } else {
    return `${distanceInFeet} ft`;
  }
})

const durationHours = computed(() => {
  const hours = Math.floor(props.activity.durationInMinutes / 60);
  const hoursString = hours === 1 ? 'hour' : 'hours';
  return `${hours} ${hoursString}`;
})
const durationMinutes = computed(() => {
  const minutes = Math.floor(props.activity.durationInMinutes % 60);
  const minutesString = minutes === 1 ? 'min' : 'mins';
  return `${minutes} ${minutesString}`;
})

const avgPace = computed(() => {
  // Calculate the average pace in miles per hour
  const distanceInMiles = props.activity.distanceInMeters / 1609.34;
  const durationInHours = props.activity.durationInMinutes / 60;
  return distanceInMiles / durationInHours;
})

const calories = computed(() => {
  // Calculate the calories burned
  return props.user.calculateCaloriesBurned(props.activity).toFixed(0);
})

</script>

<template>
  <div class="box has-text-success summary">
    <h2 class="title">{{ timeString }}</h2>
    <div class="columns is-multiline">
      <div v-if="User.isDistanceActivity(activity.type)" class="column is-half">
        <h3 class="value">{{ distanceOutput }}</h3>
        <caption class="caption">Distance</caption>
      </div>
      <div class="column is-half">
        <h3 v-if="parseInt(props.activity.durationInMinutes) >= 60" class="value">{{ durationHours }} </h3>
        <h3 class="value">{{ durationMinutes }} </h3>
        <caption class="caption">Duration</caption>
      </div>
      <div v-if="User.isDistanceActivity(activity.type)"  class="column is-half">
        <h3 class="value">{{ avgPace.toFixed(2) }} mph</h3>
        <caption class="caption">Avg Pace</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">{{ calories }}</h3>
        <caption class="caption">calories</caption>
      </div>
    </div>
  </div>
</template>

<style scoped>
.caption {
  display: block;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;

}

.summary {
  text-align: center;
}
</style>
