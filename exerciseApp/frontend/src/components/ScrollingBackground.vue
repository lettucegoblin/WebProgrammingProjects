<template>
  <div class="ScrollingBackground">
    <div class="blur background"></div>
    <div class="gradient"></div>
  </div>
</template>

<style lang="scss" scoped>
.ScrollingBackground,
.ScrollingBackground .blur,
.ScrollingBackground .gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -9999;
}
.ScrollingBackground .blur {
  filter: blur(5px);
  background-image: url(@/assets/exercises.png);
  background-size: cover;
  background-position: top center;
}
.ScrollingBackground .gradient {
  $gradient1: 0%;
  $gradient2: 10%;
  $gradient3: 95%;
  background: rgb(220 216 42 / 38%);
  -webkit-mask-image: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) $gradient1,
    rgba(0, 0, 0, 1) $gradient2,
    rgba(0, 0, 0, 0) $gradient3
  );
  mask-image: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) $gradient1,
    rgba(0, 0, 0, 1) $gradient2,
    rgba(0, 0, 0, 0) $gradient3
  );
}
</style>

<script lang="ts">
export default {
  name: "ScrollingBackground",
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const gradient = document.querySelector(
        ".ScrollingBackground .background",
      ) as HTMLElement;
      const scrollPosition = window.scrollY;
      const newPosition = Math.abs(scrollPosition * 0.05);
      //console.log(newPosition);
      if (gradient) gradient.style.backgroundPositionY = `-${newPosition}px`;
    },
  },
};
</script>
