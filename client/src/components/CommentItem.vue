<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img src="https://bulma.io/images/placeholders/96x96.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <a href = "#" @click="goToProfile(props.comment.author_id)"><strong>{{ author?.getName() }} </strong></a>
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

const hrefAuthorLocation = computed<string>(() => {
  return "#" + props.comment.author_id
})

const goToProfile = (id: number) => {
  console.log("goToProfile", id)
  router.push({ name: 'activity', params: { id: id.toString() } })
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
</style>