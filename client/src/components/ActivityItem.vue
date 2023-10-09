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
          <strong>{{ props.user.getName() }}</strong> <small>@{{ props.user.personalData.online_handle }}</small> <small
            class="tooltip">{{ formatTime }}<span class="tooltiptext">{{ timeString }}</span></small>
          <br>
          {{ props.activity.notes }}
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
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { User, type Activity } from '@/components/User';

//PropType for interfaces: https://stackoverflow.com/a/75050585
import { computed, type PropType } from 'vue';
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
    type: Object,
    required: true,
  }
});

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
  console.log(props.activity)
  const time = new Date(now.getTime() - props.activity.numDaysAgo * 24 * 60 * 60 * 1000);
  return time.toLocaleDateString();
})
</script>

<style scoped>
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