<template>
  <div class="book-item">
    <div class="details">
      <div class="title">
        <router-link :to="`/book/${book.slug}`">
          <h2>{{ book.rank }}. {{ book.title }}</h2>
        </router-link>
        <p>({{ book.rating }}/10)</p>
      </div>
      <p class="author">{{ book.author }}</p>
      <p class="synopsis">{{ truncate(book.synopsis) }}</p>
      <div class="upvotes">
        <button v-if="book.upvoted" class="selected">Upvoted</button>
        <button v-else>Upvote</button>
        <p>Upvoted {{ book.upvotes }} times</p>
      </div>
    </div>
    <router-link :to="`/book/${book.slug}`">
      <img
        data-cy="book-cover-link"
        class="book-cover"
        :src="book.cover"
        :alt="book.title"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Book } from "../types/Book";

/**
 * Component that handles the rendering of the single book item in the list.
 */
const props = defineProps<{
  book: Book;
  index: Number;
}>();

function truncate(text = "", length = 200) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.book-item {
  display: flex;
  padding: $spacing-large;

  @include mobile-flex-column();

  .title {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-medium;

    h2 {
      margin-right: $spacing-medium;
    }
  }

  .details {
    padding-right: $spacing-medium;
  }

  .author {
    font-style: italic;
    margin-bottom: $spacing-large;
  }

  .book-cover {
    max-width: 135px;
    height: auto;
  }

  .synopsis {
    margin-bottom: $spacing-large;
  }

  .upvotes {
    display: flex;
    align-items: center;

    button {
      margin-right: $spacing-medium;
    }
  }
}
</style>
