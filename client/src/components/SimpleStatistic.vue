<script setup lang="ts">
import { ref } from 'vue' 
import SimpleStatisticItem from '../components/SimpleStatisticItem.vue'
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-half">
      <SimpleStatisticItem user="a"/>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped></style>
