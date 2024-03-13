import { Comment } from "../types/Comment";

/**
 * Fetches comments from localStorage.
 *
 * @param key The localStorage key under which comments are stored.
 * @returns An array of comments.
 */
export function fetchComments(key: string): Comment[] {
  const commentsJSON = localStorage.getItem(key);
  if (commentsJSON) {
    return JSON.parse(commentsJSON) as Comment[];
  }
  return [];
}

/**
 * Creates a new comment and adds it to the stored comments array in localStorage.
 *
 * @param key The localStorage key under which comments are stored.
 * @param newCommentContent The content of the new comment.
 */
export function postComment(key: string, newCommentContent: string): Comment {
  // Fetch existing comments
  const comments = fetchComments(key);

  // Create a new comment object
  const newComment: Comment = {
    id: Date.now(), // Use current timestamp as a simple unique ID
    content: newCommentContent,
    createdAt: new Date(),
  };

  // Add the new comment to the array and save it back to localStorage
  const newComments = [newComment, ...comments];
  localStorage.setItem(key, JSON.stringify(newComments));

  return newComment;
}
