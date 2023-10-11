<template>
  <div class="container">
    <!-- search bar -->
    <input class="input" type="text" placeholder="Search" v-model="searchInput" />
    <div class="filter-select columns">

      <pagination class="column is-four-fifths" :currentPage="page" :totalPages="totalPages"
        :onPageChange="clickCallback"></pagination>
      <div class="row-select column dropdown is-hoverable is-left">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Rows</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a v-for="n in 7" href="#" @click="changeCountPerPage(Math.round((5 * n * n) / 10) * 10)"
              class="dropdown-item">{{ Math.round((5 * n * n) / 10) * 10 }}</a>

          </div>
        </div>
      </div>
    </div>
    <!-- Bulma columns of user media in rows and columns -->
    <div class="user-list columns is-multiline">
      <div class="card" v-for="user in usersPaginated">

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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/components/User';
import pagination from '@/components/pagination.vue';
import ProfilePhotoItem from '@/components/ProfilePhotoItem.vue';
import { ref, type PropType, computed } from 'vue';
const page = ref(1);
const searchInput = ref("");
const changeCountPerPage = (n: number) => {
  console.log("changeCountPerPage", n);
  totalPages.value = Math.ceil(props.users.length / n);
};

const totalPages = ref(5);
const pageCount: any = computed<number>(() => {
  return Math.ceil(props.users.length / totalPages.value);
});

changeCountPerPage(20);
const clickCallback = (pageNum: number) => {
  console.log("clickCallback", pageNum);
  page.value = pageNum;
};

const usersFiltered = computed<User[]>(() => {
  return props.users.filter((user) => {
    return (
      user.getName().toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.personalData.online_handle.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  });
});

const usersPaginated = computed<User[]>(() => {
  const start = (page.value - 1) * pageCount.value;
  const end = start + pageCount.value;
  return usersFiltered.value.slice(start, end);
});

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

</script>

<style scoped>
.filter-select {
  margin-top: 0.5em;
}
.row-select {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-grow: 0;
}
.pagination {
  margin-bottom: 0px  ;
  width: 80vw;
}
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