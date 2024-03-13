<template>
  <div class="book-details">
    <div class="header">
      <h1>{{ book.title }}</h1>
      <div class="upvotes">
        <span>Upvoted: {{ book.upvotes }} times</span>
        <button v-if="book.upvoted" class="selected">Upvoted</button>
        <button v-else>Upvote</button>
      </div>
    </div>
    <p class="author">{{ book.author }}</p>
    <div class="image-wrapper">
      <img :src="book.cover" :alt="`Cover of ${book.title}`" />
    </div>
    <h2>Synopsis</h2>
    <p class="synopsis">{{ book.synopsis }}</p>
    <div class="rating">Rating: {{ book.rating }}</div>

    <BookComments :slug="book.slug" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Book } from "@/types/Book";
import BookComments from "@/components/BookComments.vue";

/**
 * Component that handles the rendering of the book details.
 */
const props = defineProps({
  book: Object as () => Book,
});
</script>

<style lang="scss" scoped>
.book-details {
  background-color: $background-color-secondary;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  min-height: 100vh;
  padding: $spacing-large;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .author {
    font-style: italic;
  }

  .image-wrapper {
    text-align: center;
    margin: $spacing-medium 0;
  }

  img {
    max-width: 400px;
    height: auto;
  }

  .synopsis {
    margin-bottom: $spacing-large;
  }

  .rating {
    font-weight: bold;
    margin-bottom: $spacing-large;
  }

  .upvotes {
    span {
      margin-right: $spacing-medium;
    }
  }
}
</style>
