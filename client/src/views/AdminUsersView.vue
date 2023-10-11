<template>
  <div>
    <div class="title">😎 What's up, this is the admin users view 😎</div>
    <!-- List of users rows with columns for each field of personalDetails -->
    <!-- columns: profile picture, First Name,	Last Name,	Emails,	Handle, Is Admin, Buttons	-->
    <!--<vue-paginate :model-value="page" :page-count="pageCount" :page-range="10" :margin-pages="0"
          :click-handler="clickCallback" prev-text="Prev" next-text="Next" container-class="pagination is-centered"
          page-class="pagination-link" prev-class="pagination-previous" next-class="pagination-next" disabled-class="is-disabled"
          active-class="is-current" @update:model-value="page = $event" />-->

    <pagination :current-page="page" :total-pages="pageCount" :on-page-change="clickCallback" />
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">

      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Emails</th>
          <th>Handle</th>
          <th>Is Admin</th>
          <th>
            <!--Dropdown to select how many rows-->
            <div class="dropdown is-hoverable is-right">
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
                  <a v-for="n in 6" href="#" @click="changeListDisplaySize(3 + n)" class="dropdown-item">{{ 3 + n }}</a>
                  <a v-for="n in 7" href="#" @click="changeListDisplaySize(Math.round((5 * n * n) / 10) * 10)"
                    class="dropdown-item">{{ Math.round((5 * n * n) / 10) * 10 }}</a>

                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersPaginated">
          <th>
            <ProfilePhotoItem class="photo" :userId="user.id" />
          </th>
          <td>{{ user.personalData.firstName }}</td>
          <td>{{ user.personalData.lastName }}</td>
          <td>{{ user.personalData.emails }}</td>
          <td>{{ user.personalData.online_handle }}</td>
          <td>{{ user.isAdmin }}</td>
          <td><button class="button">edit</button><button class="button is-warning">x</button></td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import { ref, type PropType, computed } from 'vue';
import ProfilePhotoItem from '@/components/ProfilePhotoItem.vue';
import pagination from '@/components/pagination.vue';

const changeListDisplaySize = (n: number) => {
  console.log("changeListDisplaySize", n);
  pageLength.value = n;
};
const pageLength = ref(5);

const pageCount: any = computed<number>(() => {
  return Math.ceil(props.users.length / pageLength.value);
});

const usersPaginated = computed<User[]>(() => {
  const start = (page.value - 1) * pageLength.value;
  const end = start + pageLength.value;
  return props.users.slice(start, end);
});

const page = ref(1);
const clickCallback = (pageNum: number) => {
  console.log("clickCallback", pageNum);
  page.value = pageNum;
};

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
.photo {
  width: 128px;
}

.table tbody {
  word-break: break-word;
}

.title {
  text-align: center;
}
</style>