<template>
  <div class="modal" :class="{ 'is-active': modelValue }">
    <div class="modal-background" @click="closeModel"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Workout</p>
        <button class="delete" aria-label="close" @click="closeModel"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <form>
            <label class="label">Workout Type</label>
            <div class="control">
              <!-- Q: I don't know why v-model doesnt work for select. -->
              <select :value="activity.type" @input="e => activity.type = (e.target as HTMLInputElement).value" class="input">
                <option v-for="activity in Object.keys(User.activitiesAndTheirMET)">{{ activity }}</option>
              </select>
            </div>
            <label class="label">Difficulty</label>
            <div class="control">
              <label class="radio">
                <input @click="activity.wasDifficult = false" type="radio" name="difficulty" value="easy">
                Easy
              </label>
              <label class="radio">
                <input @click="activity.wasDifficult = true" type="radio" name="difficulty" value="difficult">
                Difficult
              </label>
            </div>
            <label class="label">Average Heart Rate</label>
            <div class="control">
              <input class="input" type="number" min="0" v-model="activity.avgHeartRate"  placeholder="Average Heart Rate in beats per minute">
            </div>
            <label class="label">Distance</label>
            <div class="control">
              <input class="input" type="number" min="0" v-model="activity.distanceInMeters"  placeholder="Distance in meters">
            </div>
            <label class="label">Reps</label>
            <div class="control">
              <input @click="console.log(newActivity)" v-model="activity.reps" class="input" type="number" min="0" placeholder="Reps">
            </div>
            <label class="label">Sets</label>
            <div class="control">
              <input class="input" type="number" min="0" v-model="activity.sets" placeholder="Sets">
            </div>
            <label class="label">Weight</label>
            <div class="control">
              <input class="input" type="number" min="0" v-model="activity.weightInPounds" placeholder="Weight in pounds">
            </div>
            <label class="label">Duration</label>
            <div class="control">
              <input class="input" type="number" min="0" v-model="activity.durationInMinutes" placeholder="Duration in minutes">
            </div>
            <label class="label">Location</label>
            <div class="control">
              <input class="input" type="text" v-model="activity.location" placeholder="Location">
            </div>
            <label class="label">Notes</label>
            <div class="control">
              <textarea class="textarea" placeholder="Notes" v-model="activity.notes"></textarea>
            </div>
            <label class="label">Date</label>
            <div class="control">
              <input @input="parseDate" :max="new Date().toISOString().substring(0,10)" class="input" type="date" placeholder="Date">
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveActivity">Save changes</button>
        <button class="button" @click="closeModel">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">

import { User, type Activity } from '@/components/User';
import { computed, ref, type PropType } from 'vue';

const emit = defineEmits(['update:modelValue']);

const newActivity = ref({ ...User.defaultActivity} as Activity)

// convert date to number of days ago (e.g. 1 day ago, 2 days ago, etc.)
const parseDate = (e: Event) => {
  const date = (e.target as HTMLInputElement).value;
  const today = new Date();
  const dateObj = new Date(date);
  const diffTime = Math.abs(today.getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  newActivity.value.numDaysAgo = diffDays - 1;
  console.log(newActivity.value.numDaysAgo);
}

const activity = computed(() => {
  return newActivity.value;
});

const saveActivity = () => {
  console.log(activity.value);
  props.user.personalData.activities.push(activity.value);
  closeModel()
}

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  modelValue: { // 2-way binding of whether the modal is open or not
    type: Boolean,
    required: true,
  },
});

const closeModel = () => {
  emit('update:modelValue', false);
}


</script>

<style scoped></style>