<script setup lang="ts">
// We're sent the user object from the parent component
const props = defineProps(['user'])
console.log(props.user)
</script>

<template>
  <div class="box has-text-success summary">
    <h2 class="title">Today</h2>
    <div class="columns is-multiline">
      <div class="column is-half">
        <h3 class="value">0 ft</h3>
        <caption class="caption">Distance</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">0:0</h3>
        <caption class="caption">Duration</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">NaN mph</h3>
        <caption class="caption">Avg Pace</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">0</h3>
        <caption class="caption">Calories</caption>
      </div>
    </div>
  </div>
</template>

<style scoped>
.value{
  font-size: 2rem;
  font-weight: bold;
}
.title{
  font-size: 1.5rem;
  font-weight: bold;

}
.summary{
  text-align: center;
}

</style>
