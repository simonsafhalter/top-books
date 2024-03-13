<template>
  <div>
    <BookDetails v-if="book" :book="book" />
    <p v-else>{{ state }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBookBySlug } from "@/api/books";
import type { Book } from "@/types/Book";
import BookDetails from "@/components/BookDetails.vue";

const route = useRoute();
const book = ref<Book | null>(null);
const state = ref<string>("Loading");

/**
 * Responsible for fetching a single book details and managing the state.
 */
onMounted(async () => {
  // Get slug from URL
  const slug = route.params.slug;

  if (typeof slug !== "string") {
    state.value = "Invalid ID";
    return;
  }

  // Fetch book details
  const response: Book | string = await getBookBySlug(slug);

  if (typeof response === "string" || !response?.slug) {
    state.value = "Book not found";
    return;
  }

  book.value = response;
});
</script>
