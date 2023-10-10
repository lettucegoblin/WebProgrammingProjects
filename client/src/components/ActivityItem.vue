<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <a :href="previewHrefLocation" @click.prevent="goToProfile(props.user.id)"><strong>{{ props.user.getName()
          }}</strong> </a>
          <small class="handle">@{{ props.user.personalData.online_handle }}</small>
          <small class="tooltip">{{ formatTime }}
            <span class="tooltiptext">{{ timeString }}</span>
          </small>
          <br>
          {{ props.activity.notes }}
        <div class="columns activity">
          <div class="column has-text-centered" v-if="isDistanceActivity">
            <span class="icon">
              <i class="fas fa-road">
                {{ props.activity.distanceInMeters }} m
              </i></span>
            <span class="icon">
              <i class="fas fa-stopwatch">
                {{ props.activity.durationInMinutes }} min
              </i></span>
            <span class="icon">
              <i class="fas fa-shoe-prints">
                {{ User.averagePace(props.activity).toFixed(2) }} m/s
              </i></span>
          </div>
          <div class="column has-text-centered" v-if="isStrengthActivity">
            <span class="icon"><i class="fas fa-dumbbell">{{ props.activity.weightInPounds }} lbs</i></span>
            <span class="icon"><i class="fas fa-redo">{{ props.activity.reps }} reps</i></span>
            <span class="icon"><i class="fas fa-redo-alt">{{ props.activity.sets }} sets</i></span>
          </div>
          <div class="column has-text-centered">
            <span class="icon">
              <i class="fas fa-fire">
                {{ props.user.calculateCaloriesBurned(props.activity).toFixed(0) }} cal
              </i></span>

            <span class="icon">
              <i class="fas fa-heartbeat">{{ props.activity.avgHeartRate }} bpm</i></span>

            <span class="icon difficulty">
              <i class="fas fa-star">
                {{ props.activity.wasDifficult ? "Difficult" : "Easy" }}
              </i></span>
          </div>
        </div>
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
            <span @click="like" :class="{ 'liked': User.hasLiked(props.activity, props.userState.currentUser.id) }"
              class="icon is-small"><i class="likes fas fa-heart">&nbsp{{ props.activity.numOfLikes }}</i></span>
          </a>
        </div>
      </nav>
      <CommentItem v-for="comment in props.activity.comments" :comment="comment" :users="props.users"
        :userState="userState" />
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>

  </article>
</template>

<script setup lang="ts">
import { User, type Activity } from '@/components/User';
import CommentItem from './CommentItem.vue';
//PropType for interfaces: https://stackoverflow.com/a/75050585
import { computed, type PropType } from 'vue';
import router from '@/router';
const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  activity: {
    type: Object as PropType<Activity>,
    required: true,
  },
  userState: {
    type: Object as PropType<{ currentUser: User }>,
    required: true,
  },
  users: {
    type: Array<User>,
    required: true,
  },
});


const isDistanceActivity = computed<boolean>(() => {
  return User.isLooselyDistanceActivity(props.activity.type, props.activity.notes);
})
const isStrengthActivity = computed<boolean>(() => {
  return User.isLooselyStrengthActivity(props.activity.type, props.activity.notes);
})

//console.log("activityitem", props.activity, "isDistanceActivity and isStrengthActivity", isDistanceActivity.value, isStrengthActivity.value)

// find a user who has both isDistanceActivity and isStrengthActivity in one of their activities
const findUsersWithBoth = () => {
  const users = props.users.filter((user) => {
    return user.personalData.activities.some((activity) => {
      return User.isLooselyDistanceActivity(activity.type, activity.notes) && User.isLooselyStrengthActivity(activity.type, activity.notes);
    });
  });
  return users;
}

//console.log("Users with both distance and strength", findUsersWithBoth())

const previewHrefLocation = computed<string>(() => {
  return "/" + props.user.id
})

const goToProfile = (id: number) => {

  router.push({ name: 'activity', params: { id: id.toString() } })
}

const like = () => {
  console.log("like", props.activity, props.userState.currentUser.id)
  User.like(props.activity, props.userState.currentUser.id)
}

// numDaysAgo to 
const formatTime = computed(() => {
  const numDaysAgo = props.activity.numDaysAgo;
  if (numDaysAgo == 0) return "Today";
  if (numDaysAgo == 1) return "Yesterday";
  if (numDaysAgo < 7) return numDaysAgo + " days ago";
  if (numDaysAgo < 14) return "Last week";
  if (numDaysAgo < 21) return "2 weeks ago";
  if (numDaysAgo < 28) return "3 weeks ago";
  if (numDaysAgo < 60) return "Last month";
  if (numDaysAgo < 180) return "about 6 months ago";
  if (numDaysAgo < 365) return "about a year ago";
  return "a long time ago";
});

// Time of (now - numDaysAgo)
const timeString = computed(() => {
  const now = new Date();
  //console.log(props.activity)
  const time = new Date(now.getTime() - props.activity.numDaysAgo * 24 * 60 * 60 * 1000);
  return time.toLocaleDateString();
})
</script>

<style scoped>
.activity {
  margin-bottom: 0px;
}

.activity .icon {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 1.5rem;
  width: auto;
}

.difficulty {
  justify-content: initial;
}

.handle {
  margin: 0.5em;
}

.likes {
  padding-left: 1.5em;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>