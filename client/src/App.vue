<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// add reactive variables here
const navbar = ref({ burgerIsActive: false, loginDropdownIsActive: false });
// user data First Name	Last Name	Emails	Handle	Is Admin

// Some ai generated names
// {feminine, masculine} = {firstNames.feminine, firstNames.masculine}
import firstNames from '@/assets/firstNames.json';
// raw array of last names
import lastNames from '@/assets/lastNames.json';
// raw array of pretend emails (not real)(fake)(ai)
import emails from '@/assets/pretendEmails.json';
console.log(firstNames, lastNames, emails)
const users = [
  { id: 1, 
    personalData: { firstName: '', lastName: '', emails: [], handle: ''},
    activities: [{ date: "", workout: {type:'run/bike/walk/cardio/strength', distance: 0, duration: 0, avgPace: 0, calories: 0, location: "" }}],
    isAdmin: false
  }
]


</script>

<template>
  <header>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="112"
            height="28"></RouterLink>
        <RouterLink class="navbar-item" to="/about">
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
          <span>My Activity</span>
        </RouterLink>
        <RouterLink class="navbar-item" to="/about">
          <span class="icon">
            <i class="fas fa-chart-line"></i>
          </span>
          <span>Statistics</span>
        </RouterLink>
        <RouterLink class="navbar-item" to="/about">
          <span class="icon">
            <i class="fas fa-user-friends"></i>
          </span>
          <span>Friend Activity</span>
        </RouterLink>
        <!-- On navbar-burger click it toggles 'is-active' class on itself and navbar-menu-->
        <a @click="navbar.burgerIsActive = !navbar.burgerIsActive" :class="{ 'is-active': navbar.burgerIsActive }"
          role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMidterm">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div :class="{ 'is-active': navbar.burgerIsActive }" id="navbarMidterm" class="navbar-menu">
        <div class="navbar-start">

          <RouterLink class="navbar-item" to="/about">People Search</RouterLink>
          <!-- Admin Nav -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Admin
            </a>
            <div class="navbar-dropdown">
              <RouterLink class="navbar-item" to="/about">
                Users
              </RouterLink>
            </div>

          </div>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>

              <div :class="{ 'is-active': navbar.loginDropdownIsActive }" class="dropdown">
                <div class="dropdown-trigger">
                  <button @click="navbar.loginDropdownIsActive = !navbar.loginDropdownIsActive" class="button"
                    aria-haspopup="true" aria-controls="login-dropdown-menu">
                    <span>Log in</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="login-dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                      Dropdown item
                    </a>
                    <a class="dropdown-item">
                      Other dropdown item
                    </a>
                    <a href="#" class="dropdown-item is-active">
                      Active dropdown item
                    </a>
                    <a href="#" class="dropdown-item">
                      Other dropdown item
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                      With a divider
                    </a>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div class="navbar-item">
            <a class="button">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span>Tweet</span>

            </a>
          </div>

        </div>
      </div>

    </nav>
  </header>

  <RouterView class="container" /> <!-- Where the pages are inserted -->
</template>

<style scoped></style>
