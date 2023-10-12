<script setup lang="ts">
import { computed } from 'vue'
import SimpleStatisticItem from '../components/SimpleStatisticItem.vue'

import { User, type Activity, type ActivityAverage, type TimeCheckpoint } from '@/components/User'

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
});
const sortedActivities = computed(() => {
  if (props.user.personalData.activities == undefined) return new Array<Activity>();
  const activitiesCopy = [...props.user.personalData.activities];
  return activitiesCopy.sort((a: any, b: any) => {
    return parseInt(a.numDaysAgo) - parseInt(b.numDaysAgo);
  });
})

// congregate into groups: today, this week, this month, last 3 months, this year, all time
// it will be an array of sum objects. if there are none this week just dont add the sum object.
// the sum object will show the average pace, distance, duration, and calories burned for that time period

const congregateActivities = computed(() => {
  const sortedActivitiesArr = sortedActivities.value;
  const today = new Date();
  const todayNumDaysAgo = 0;
  const thisWeekNumDaysAgo = 7;
  const thisMonthNumDaysAgo = 30;
  const last3MonthsNumDaysAgo = 90;
  const thisYearNumDaysAgo = 365;
  const allTimeNumDaysAgo = Infinity;
  const arrOfTimeCheckpoints = [todayNumDaysAgo, thisWeekNumDaysAgo, thisMonthNumDaysAgo, last3MonthsNumDaysAgo, thisYearNumDaysAgo, allTimeNumDaysAgo]
  const arrOfTimeCheckpointStrings = ['Today', 'This Week', 'This Month', 'Last 3 Months', 'This Year', 'All Time']

  const congregateActivitiesArr: { displayString: string; avgActivity: ActivityAverage }[] = [];
  const tempArrOfActivities = new Array<Activity>();
  let indexOfTimeCheckpoints = 0;
  // align indexOfTimeCheckpoints with the first activity that is within the time checkpoint
  if(sortedActivitiesArr.length == 0) return congregateActivitiesArr;
  
  while (sortedActivitiesArr[0].numDaysAgo > arrOfTimeCheckpoints[indexOfTimeCheckpoints]) {
    indexOfTimeCheckpoints++;
  }

  // loop through sorted activities and add them to the congregate activities array by creating a new activity object with the averages
  for (let i = 0; i < sortedActivitiesArr.length; i++) {
    const activity = sortedActivitiesArr[i];
    const numDaysAgo = activity.numDaysAgo;
    if (numDaysAgo < arrOfTimeCheckpoints[indexOfTimeCheckpoints]) {
      tempArrOfActivities.push(activity);
    } else {
      if (tempArrOfActivities.length > 0) {
        // create a new activity object with the averages of the tempArrOfActivities
        const newAvgActivity: ActivityAverage = collateActivities(tempArrOfActivities);
        tempArrOfActivities.length = 0; // empty tempArrOfActivities
        congregateActivitiesArr.push({
          displayString: arrOfTimeCheckpointStrings[indexOfTimeCheckpoints],
          avgActivity: newAvgActivity
        });
      }
      indexOfTimeCheckpoints++;
    }

  }
  // if there's anything left in the tempArrOfActivities, add it to the congregateActivitiesArr
  if (tempArrOfActivities.length > 0) {
    const newAvgActivity: ActivityAverage = collateActivities(tempArrOfActivities);
    congregateActivitiesArr.push({
      displayString: arrOfTimeCheckpointStrings[indexOfTimeCheckpoints],
      avgActivity: newAvgActivity
    });
  }
  //console.log("congregateActivitiesArr", congregateActivitiesArr)
  return congregateActivitiesArr;
});

function collateActivities(tempArrOfActivities: Array<Activity>) {
  const newAvgActivity: ActivityAverage = {
    avgDistanceInMeters: 0,
    avgDurationInMinutes: 0,
    avgHeartRate: 0,
    avgReps: 0,
    avgSets: 0,
    avgWeightInPounds: 0,
    totalCaloriesBurned: 0,
    avgPace: 0,
    avgDifficulty: 0,
    avgNumOfComments: 0,
    avgNumOfLikes: 0,
  }
  // loop through the tempArrOfActivities and add all the values to the newAvgActivity
  // average them all by the total number of tempArrOfActivities after the loop
  for (let j = 0; j < tempArrOfActivities.length; j++) {
    const activity = tempArrOfActivities[j];
    newAvgActivity.avgDistanceInMeters += activity.distanceInMeters;
    newAvgActivity.avgDurationInMinutes += activity.durationInMinutes;
    newAvgActivity.avgHeartRate += activity.avgHeartRate;
    newAvgActivity.avgReps += activity.reps;
    newAvgActivity.avgSets += activity.sets;
    newAvgActivity.avgWeightInPounds += activity.weightInPounds;
    newAvgActivity.totalCaloriesBurned += props.user.calculateCaloriesBurned(activity);
    newAvgActivity.avgCaloriesBurned = newAvgActivity.totalCaloriesBurned;
    newAvgActivity.avgPace += User.averagePace(activity);
    newAvgActivity.avgDifficulty += activity.wasDifficult ? 1 : 0;
    newAvgActivity.avgNumOfComments += activity.numOfComments;
    newAvgActivity.avgNumOfLikes += activity.numOfLikes;
  }
  // loop through newAvgActivity keys and divide by the length of tempArrOfActivities to get true averages
  for (const key in newAvgActivity) {
    if (Object.prototype.hasOwnProperty.call(newAvgActivity, key)) {
      if (key == "totalCaloriesBurned") continue; // totalCaloriesBurned doesn't need to be averaged.
      const value: number = newAvgActivity[key];
      newAvgActivity[key] = value / tempArrOfActivities.length;
    }
  }
  return newAvgActivity;
}

</script>

<template>
  <SimpleStatisticItem v-for="collatedAverage in congregateActivities" :user="props.user"
        :collatedAverage="collatedAverage" />
</template>

<style scoped></style>
