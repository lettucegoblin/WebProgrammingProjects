<template>
  <nav class="pagination is-centered">
    <a class="pagination-previous" @click="previousPage" :class="{'is-disabled':currentPage === 1}">Previous</a>
    <a class="pagination-next" @click="nextPage" :class="{'is-disabled':currentPage === totalPages}">Next</a>
    <ul class="pagination-list">
      <li v-for="page in pages">
        <a class="pagination-link" :key="page" @click="goToPage(page)" :class="{'is-current':currentPage === page}">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const props = defineProps<PaginationProps>();

const currentPage = ref(props.currentPage);
const totalPages = ref(props.totalPages);

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    props.onPageChange(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    props.onPageChange(currentPage.value);
  }
};

const pages = computed(() => {
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage.value - 6);
  let endPage = Math.min(totalPages.value, currentPage.value + 6);

  if (startPage > 1) {
    pageNumbers.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages.value) {
    pageNumbers.push('...');
  }

  return pageNumbers;
});

const goToPage = (page: number | string) => {
  if (typeof page === 'number') {
    currentPage.value = page;
    props.onPageChange(currentPage.value);
  } else if (page === '...') {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      props.onPageChange(currentPage.value);
    } else if (currentPage.value > 1) {
      currentPage.value--;
      props.onPageChange(currentPage.value);
    }
  }
};

watch(() => props.currentPage, (value) => {
  currentPage.value = value;
});

watch(() => props.totalPages, (value) => {
  totalPages.value = value;
});

const disabled = computed(() => {
  return currentPage.value === 1 || currentPage.value === totalPages.value;
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 0 0 1rem;
}
.pagination-previous {
    order: -1;
}

.pagination {
  justify-content: center;
}

.pagination-previous a, .pagination-next a{
  padding: 1em;
}
.pagination .pagination-link a, .pagination-previous a, .pagination-next a {
  width: 100%;
}
</style>