<template>
  <div id="login-model" class="modal">
    <div class="modal-background" @click="closeLoginModel"></div>
    <div class="modal-content">
      <div class="box">
        <p>Login</p>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeLoginModel"
    ></button>
  </div>
</template>
<script setup lang="ts">
function closeLoginModel() {
  const loginModel = document.getElementById("login-model");
  if (loginModel) {
    loginModel.classList.remove("is-active");
  }
}
</script>
