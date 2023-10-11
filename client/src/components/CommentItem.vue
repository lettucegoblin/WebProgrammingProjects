<template>
  <article class="media">
    <figure class="media-left">
      <RouterLink :to="{ name: 'profile', params: { id: props.comment.author_id } }" class="image is-48x48">
        <ProfilePhotoItem :userId="props.comment.author_id"/>
      </RouterLink>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <RouterLink :to="{ name: 'profile', params: { id: props.comment.author_id } }">
            <strong>{{ author?.getName() }} </strong>
          </RouterLink>
          <small class="handle">@{{ author?.personalData.online_handle }}</small>
          <br>
            {{ props.comment.comment }}
          <br>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span @click="like" :class="{'liked':User.hasLiked(props.comment, props.userState.currentUser.id)}" class="icon is-small"><i class="likes fas fa-heart">&nbsp{{ props.comment.numOfLikes }}</i></span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</template>

<script setup lang="ts">
import ProfilePhotoItem from './ProfilePhotoItem.vue';
import { computed, defineProps, type PropType } from 'vue'
import router from '@/router'
import { type ActivityComment, User } from '@/components/User'
const props = defineProps({
  comment: {
    type: Object as PropType<ActivityComment>,
    required: true,
  },
  users: {
    type: Array<User>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  },
});

const like = () => {
  User.like(props.comment, props.userState.currentUser.id)
}

const author = computed(() => {
  // find by id
  let user = props.users.find((user) => {
    return user.id == props.comment.author_id;
  });
  return user;
})
</script>

<style scoped>
.likes {
  padding-left: 1em;
}
.handle {
  margin: 0.5em;
}
</style>