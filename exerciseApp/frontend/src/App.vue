<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="./assets/logo_transparent.png" alt="Home Logo" />
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarExercise"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarExercise" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="openLoginModel">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <LoginModel />
  <router-view />
</template>

<script setup lang="ts">
import LoginModel from "@/components/LoginModel.vue";
function openLoginModel() {
  const loginModel = document.getElementById("login-model");
  if (loginModel) {
    loginModel.classList.add("is-active");
  }
}
</script>

<style lang="scss">
.navbar {
  background-color: #bdfbf1 !important;
}
</style>
