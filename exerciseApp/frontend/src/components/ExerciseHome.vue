<template>
  <div class="section">
    <section class="hero is-halfheight container is-max-desktop">
      <div class="notification is-primary">{{ msg }}</div>
      <button @click="increment">count is: {{ count }}</button>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps({
  msg: String,
});
// count
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>
<!-- Example of how to do it with Options API
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
</script>
-->

<style lang="scss">
.section {
  background-image: url(@/assets/exercises.png);
  background-size: cover;
  background-repeat-y: no-repeat;
  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 1) 77%,
    rgba(0, 0, 0, 0) 95%
  );
  background-position-y: top;
}
.hero {
  backdrop-filter: blur(5px);
  background-color: #00d1b270;
  border-radius: 21px;
}
</style>
