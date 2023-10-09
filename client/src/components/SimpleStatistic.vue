<script setup lang="ts">
import { computed } from 'vue' 
import SimpleStatisticItem from '../components/SimpleStatisticItem.vue'

import { User, type Activity } from '@/components/User'

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
});
const sortedActivities = computed(() => {
  if(props.user.personalData.activities == undefined) return new Array<Activity>();
  return props.user.personalData.activities.sort((a: any, b: any) => {
    return parseInt(a.numDaysAgo) - parseInt(b.numDaysAgo);
  });
})

// congregate into groups: today, this week, this month, last 3 months, this year, all time
// it will be an array of sum objects. if there are none this week just dont add the sum object.
// the sum object will show the average pace, distance, duration, and calories burned for that time period

const congregateActivities = () => {
  const sortedActivitiesArr = sortedActivities.value;
  const today = new Date();
  const todayNumDaysAgo = 0;
  const thisWeekNumDaysAgo = 7;
  const thisMonthNumDaysAgo = 30;
  const last3MonthsNumDaysAgo = 90;
  const thisYearNumDaysAgo = 365;
  const allTimeNumDaysAgo = Infinity;
  const arrOfTimeCheckpoints = [todayNumDaysAgo, thisWeekNumDaysAgo, thisMonthNumDaysAgo, last3MonthsNumDaysAgo, thisYearNumDaysAgo, allTimeNumDaysAgo]

  const congregateActivitiesArr = new Array<Activity>();
  const tempArrOfActivities = new Array<Activity>();
  const indexOfTimeCheckpoints = 0;
  // loop through sorted activities and add them to the congregate activities array by creating a new activity object with the averages
  for(let i = 0; i < sortedActivitiesArr.length; i++) {
    const activity = sortedActivitiesArr[i];
    const numDaysAgo = activity.numDaysAgo;
    
  }

};

</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-half">
      <SimpleStatisticItem v-for="activity in sortedActivities" :user="props.user" :activity="activity"/>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped></style>
