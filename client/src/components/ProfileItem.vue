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
          <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.firstName" placeholder="First Name"/>
          <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.lastName" placeholder="Last Name"/>
          <p v-else class="title is-4">{{ props.user.getName() }}</p>

          <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.online_handle" placeholder="Online Handle"/>
          <p v-else class="subtitle is-6">@{{ props.user.personalData.online_handle }}</p>
        </div>
      </div>


      <div class="content">
        <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.aboutMe" placeholder="About Me" :multiLine="true"/>
        <div v-else>{{ props.user.personalData.aboutMe }}</div>
      </div>
      <!-- genderIdentity, age, height, weight_class, weight, oneAdjectiveToDescribeMe -->
      <div class="columns personalData">
        <div class="column has-text-centered">
          <span class="icon">
            <i class="fas fa-venus-mars">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.genderIdentity" placeholder="Gender Identity"/>
              <div v-else>{{ props.user.personalData.genderIdentity }}</div>
            </i>            
          </span>
          <span class="icon">
            <i class="fas fa-birthday-cake">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.age" placeholder="Age"/>
              <div v-else>{{ props.user.personalData.age }}</div>
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-ruler-vertical">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.height" placeholder="Height"/>
              <div v-else>{{ props.user.personalData.height }}</div>
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-weight-hanging">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.weight_class" placeholder="Weight Class"/>
              <div v-else>{{ props.user.personalData.weight_class }}</div>
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-weight">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.weight" placeholder="Weight"/>
              <div v-else>{{ props.user.personalData.weight }} lbs</div>
            </i>
          </span>
          <span class="icon">
            <i class="fas fa-comment">
              <EditInput v-if="props.editMode" class="editinput" type="text" v-model="props.user.personalData.oneAdjectiveToDescribeMe" placeholder="One Adjective to Describe Me"/>
              <div v-else>{{ props.user.personalData.oneAdjectiveToDescribeMe }}</div>
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
import EditInput from './editInput.vue';

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
  }, editMode: {
    type: Boolean,
    default: false,
  },
});
console.log("profileitem", props);

</script>

<style scoped>
.icon div {
  display: inline-block;
}
.editinput {
  margin-bottom: 0.5em;
}
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