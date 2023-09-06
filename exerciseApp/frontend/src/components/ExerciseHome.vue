<template>
  <div class="section">
    <section class="hero is-halfheight container is-max-desktop">
      <div class="notification is-primary">{{ msg }}</div>
      <button class="button is-primary" @click="increment">
        count is: {{ count }}
      </button>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Exercise App</h1>
          <h2 class="subtitle">A Vue.js project</h2>
        </div>
      </div>
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
.hero {
  backdrop-filter: blur(5px);
  background-color: #00d1b270;
  border-radius: 21px;
}
</style>
