<template>
  <div class="sign-up">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Sign Up</h1>
          <form v-on:submit="signUp">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input v-model="username" class="input" type="text" placeholder="Username">
              </div>
            </div>
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input v-model="firstName" class="input" type="text" placeholder="First Name">
              </div>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input v-model="lastName" class="input" type="text" placeholder="Last Name">
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="email" class="input" type="email" placeholder="Email">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input disabled class="input" type="password" placeholder="Password - Disabled for client demo">
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input disabled class="input" type="password" placeholder="Confirm Password">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import router from '@/router';
import { ref, type PropType } from 'vue'

const emit = defineEmits(['logIn', 'logOut']);

const props = defineProps({
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  }
});
const username = ref('XxX_JohnDoe_XxX');
const email = ref('JohnnyDoeStar@example.com');
const firstName = ref('John');
const lastName = ref('Doe');

const signUp = (event: Event) => {
  event.preventDefault();
  console.log("Sign Up", username.value, email.value);
  // 1. Create a new user object
  // 2. Add the new user object to the users array
  // 3. Log in as the new user
  // 4. Redirect to the home page

  // 1. Create a new user object
  const newPersonalData = {
    ...User.defaultPersonalData,
    firstName: firstName.value,
    lastName: lastName.value,
    online_handle: username.value,
    email: email.value,
  };

  const newUser = new User(undefined, props.users.length, true, newPersonalData);
  console.log("New User", newUser);
  // 2. Add the new user object to the users array
  props.users.push(newUser);
  // 3. Log in as the new user
  emit('logIn', newUser);

  // 4. Redirect to the home page
  router.push('/');
}


</script>

<style scoped></style>