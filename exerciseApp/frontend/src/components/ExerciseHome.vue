<template>
  <div class="container">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExerciseHome",
  props: {
    msg: String,
  },
});
</script>
