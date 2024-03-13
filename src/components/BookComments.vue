<template>
  <div class="book-comments">
    <div class="post-comment" data-cy="post-comment">
      <textarea
        v-model="newComment"
        placeholder="Leave a comment..."
      ></textarea>
      <button @click="addComment(newComment)">Post Comment</button>
    </div>
    <h2>Comments</h2>
    <span v-if="comments.length === 0">No comments</span>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id">
        <BookComment :comment="comment" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchComments, postComment } from "@/api/comments";
import { Comment } from "@/types/Comment";
import BookComment from "@/components/BookComment.vue";

/**
 * Component that handles the comment list and adding new comments.
 */
const comments = ref<Comment[]>([]);
const newComment = ref("");

const props = defineProps<{
  slug: string;
}>();

onMounted(async () => {
  comments.value = await fetchComments(props.slug);
});

async function addComment() {
  if (newComment.value?.length && newComment.value.trim()) {
    const posted = await postComment(props.slug, newComment.value);

    comments.value.splice(0, 0, posted);
    // Reset the input field
    newComment.value = "";
  }
}
</script>

<style lang="scss" scoped>
.book-comments {
  .post-comment,
  h2 {
    margin-bottom: $spacing-large;
  }
}
</style>
