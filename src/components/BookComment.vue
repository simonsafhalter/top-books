<template>
  <div class="book-comment">
    <span>{{ formatDate(comment.createdAt) }}</span>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script setup>
import { format } from "date-fns";

/**
 * Component that handles the rendering of a single comment.
 */
const props = defineProps({
  comment: Object,
});

function formatDate(dateString) {
  return format(dateString, "dd MMMM yyyy HH:mm:ss");
}
</script>

<style lang="scss" scoped>
.book-comment {
  margin-bottom: $spacing-medium;

  span {
    font-style: italic;
    font-size: 0.8rem;
  }

  p {
    margin-left: $spacing-medium;
    padding-left: $spacing-medium;
    border-left: solid 1px black;
  }
}
</style>
