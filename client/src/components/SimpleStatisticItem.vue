<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { User, type ActivityAverage} from '@/components/User';
// We're sent the user object from the parent component
const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  collatedAverage: {
    type: Object as PropType<{displayString:string, avgActivity: ActivityAverage}>,
    //          for array w/ PropType: PropType<Array<{displayString:string,avgActivity: ActivityAverage}>>, 
    //         original for reference: { displayString: string, avgActivity: Object as PropType<ActivityAverage> }[] 🤮
    //         ~   NO ONE WILL READ THIS SO I CAN SAFELY SCREAM   ~
    //        ~  🫲😇🫱 /-\\  I MISS UNSAFE CODE  //-\ 🫲😇🫱  ~
    //         ~ 👏😇🎉 \_// PRAISE TO JAVASCRIPT \\_/ 👏😇🎉 ~
    required: true,
  }
});
console.log(props.collatedAverage)


const distanceInFeet = computed(() => {
  return Math.floor(props.collatedAverage.avgActivity.avgDistanceInMeters * 3.28084);
})

const distanceOutput = computed(() => {
  // if distance is greater than or equal to a mile display in miles otherwise display in feet
  if (props.collatedAverage.avgActivity.avgDistanceInMeters >= 1609.34) {
    const distanceInMiles = props.collatedAverage.avgActivity.avgDistanceInMeters / 1609.34;
    const milesString = distanceInMiles === 1 ? 'mile' : 'miles';
    return `${distanceInMiles.toFixed(2)} ${milesString}`;
  } else {
    return `${distanceInFeet} ft`;
  }
})

const durationHours = computed(() => {
  const hours = Math.floor(props.collatedAverage.avgActivity.avgDurationInMinutes / 60);
  const hoursString = hours === 1 ? 'hour' : 'hours';
  return `${hours} ${hoursString}`;
})
const durationMinutes = computed(() => {
  const minutes = Math.floor(props.collatedAverage.avgActivity.avgDurationInMinutes % 60);
  const minutesString = minutes === 1 ? 'min' : 'mins';
  return `${minutes} ${minutesString}`;
})

const avgPace = computed(() => {
  // Calculate the average pace in miles per hour
  const distanceInMiles = props.collatedAverage.avgActivity.avgDistanceInMeters / 1609.34;
  const durationInHours = props.collatedAverage.avgActivity.avgDurationInMinutes / 60;
  return distanceInMiles / durationInHours;
})

const avgCalories = computed(() => {
  return props.collatedAverage.avgActivity.avgCaloriesBurned.toFixed(0);
});
const totalCalories = computed(() => {
  // Calculate the calories burned
  return props.collatedAverage.avgActivity.totalCaloriesBurned.toFixed(0);
})

</script>

<template>
  <div class="box has-text-success summary">
    <h2 class="title">{{ props.collatedAverage.displayString }}</h2>
    <div class="columns is-multiline">
      <div class="column is-half">
        <h3 class="value">{{ distanceOutput }}</h3>
        <caption class="caption">Average Distance</caption>
      </div>
      <div class="column is-half">
        <h3 v-if="props.collatedAverage.avgActivity.avgDurationInMinutes >= 60" class="value">{{ durationHours }} </h3>
        <h3 class="value">{{ durationMinutes }} </h3>
        <caption class="caption">Average Duration</caption>
      </div>
      <div  class="column is-half">
        <h3 class="value">{{ avgPace.toFixed(2) }} mph</h3>
        <caption class="caption">Average Pace</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">{{ avgCalories }}</h3>
        <caption class="caption">Average calories</caption>
        <h3 class="value">{{ totalCalories }}</h3>
        <caption class="caption">Total calories</caption>
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
