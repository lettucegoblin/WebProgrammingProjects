<template>
  <div class="container">
    <section class="hero is-halfheight">
      {{ msg }}
    </section>
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

<style lang="scss">
.container .hero {
  background-image: url(@/assets/logo.png);
  background-size: 100%;
  background-position-y: center;
}
</style>
