<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <ProfilePhotoItem :userId="props.user.id"></ProfilePhotoItem>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ props.user.getName() }}</p>
          <p class="subtitle is-6">@{{ props.user.personalData.online_handle }}</p>
        </div>
      </div>

      <div class="content">
        {{ props.user.personalData.aboutMe }}
      </div>
      <!-- genderIdentity, age, height, weight_class, weight, oneAdjectiveToDescribeMe -->
      <div class="columns personalData">
        <div class="column has-text-centered">
          <span class="icon">
            <i class="fas fa-venus-mars">
              {{ props.user.personalData.genderIdentity }}
            </i>            
          </span>
          <span class="icon">
            <i class="fas fa-birthday-cake">
              {{ props.user.personalData.age }}
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-ruler-vertical">
              {{ props.user.personalData.height }}
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-weight-hanging">
              {{ props.user.personalData.weight_class }}
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-weight">
              {{ props.user.personalData.weight }} lbs
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-comment">
              {{ props.user.personalData.oneAdjectiveToDescribeMe }}
            </i>
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import ProfilePhotoItem from './ProfilePhotoItem.vue';
import { computed, type PropType } from 'vue';


const props = defineProps({
  user: {
    type: User,
    required: true,
  }, 
  users: {
    type: Array<User>,
    required: true,
  }, 
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  }
});
console.log("profileitem", props);




</script>

<style scoped>
.personalData .icon {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 1.5rem;
  width: auto;
}
.personalData .icon i::before {
  margin-right: 0.5rem;
}
</style>