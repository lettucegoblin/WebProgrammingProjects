<template>
  <RouterLink :to="{ name: 'profile', params: { id: props.user.id } }">
    <div class="card" :class="{ 'full-width': fullWidth }">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <ProfilePhotoItem :userId="user.id"></ProfilePhotoItem>
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-7">{{ user.getName() }}</p>
            <p class="subtitle is-7">@{{ user.personalData.online_handle }}</p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { User } from '@/components/User';

import ProfilePhotoItem from '@/components/ProfilePhotoItem.vue';

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

</script>

<style scoped>
.user-list {
  justify-content: center;
}

.user-list .media-left {
  margin-right: 0.5rem;
}

.card .card-content {
  padding: 0.5rem;
}

.card .media {
  margin-bottom: 0.5rem;
}

.card.full-width {
  width: 100%;
}

.card {
  margin: 10px;
  width: 10vw;
  display: flex;
  align-items: center;
}

.card:hover {
  background-color: #f5f5f5;
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.1s ease-in-out;
}
</style>