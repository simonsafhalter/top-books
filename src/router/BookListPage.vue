<template>
  <div>
    <BookList v-if="books.length > 0" :books="books" />
    <p v-else>{{ state }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllBooks, BooksResponse } from "@/api/books";
import BookList from "@/components/BookList.vue";
import type { Book } from "@/types/Book";

const books = ref<Book[]>([]);
const state = ref<string>("Loading");

/**
 * Responsible for fetching a list of books and managing the state.
 */
onMounted(async () => {
  // Fetch book list
  const response: BooksResponse = await getAllBooks();

  if (!Array.isArray(response.books)) {
    state.value = response;
    return;
  }

  books.value = response.books;
});
</script>
