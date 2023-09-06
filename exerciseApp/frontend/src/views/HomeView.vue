<template>
  <div class="home">
    <ExerciseHome msg="Welcome to Exercise Home!!" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExerciseHome from "@/components/ExerciseHome.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    ExerciseHome,
  },
});
</script>
