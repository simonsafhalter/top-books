<template>
  <div class="book-list">
    <h1>Top books of all time</h1>
    <input
      data-cy="search-book-input"
      class="search-input"
      type="text"
      v-model="searchQuery"
      placeholder="Search books..."
    />
    <div class="pagination">
      <button
        @click="currentPage = Math.max(currentPage - 1, 1)"
        :disabled="currentPage <= 1"
      >
        &lt;
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        data-cy="next-page"
        @click="currentPage = Math.min(currentPage + 1, totalPages)"
        :disabled="currentPage >= totalPages"
      >
        &gt;
      </button>
    </div>
    <ul data-cy="book-list">
      <li v-for="book in paginatedBooks" :key="book.slug">
        <BookListItem :book="book" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BookListItem from "./BookListItem.vue";
import type { Book } from "@/types/Book";

/**
 * Component that handles the paginated book list with the search filtering.
 */
const props = defineProps({
  books: Array as () => Book[],
});

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(3);

const filteredBooks = computed(() => {
  return props?.books?.filter((book: Book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredBooks?.value?.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / itemsPerPage.value);
});

watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>

<style lang="scss">
.book-list {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);

  li {
    background-color: $background-color-primary;

    &:nth-child(odd) {
      background-color: $background-color-secondary;
    }
  }

  .search-input {
    color: $text-color-primary;
    background-color: $background-color-secondary;
    padding: 10px;
    font-weight: bold;
    border: none;
    border-bottom: solid 2px $color-primary;
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
  }
}
</style>
