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
