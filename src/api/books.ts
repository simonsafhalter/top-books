import axios from "axios";
import { Book } from "../types/Book";
import { addRankToBooks } from "../utils/data-parsing";

// Using 127.0.0.1 instead of localhost to be able to test with Cypress.
// A known unresolved issue (https://github.com/cypress-io/cypress/issues/26154)
const BASE_URL = "http://127.0.0.1:3000/books";

export type BooksResponse = {
  books: Book[];
  meta: {
    count: number;
  };
};

/**
 * Fetches all books from the API.
 *
 * @returns {Promise<Book[] | string>} A promise that resolves to an array of Book objects if the request is successful, or a string error message if an error occurs.
 */
export async function getAllBooks(): Promise<BooksResponse | string> {
  try {
    const response = await axios.get<BooksResponse>(`${BASE_URL}`);
    return {
      books: addRankToBooks(response.data.books),
      meta: response.data.meta,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching all books:", error.message);
      return `Error: ${error.message}`;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred";
    }
  }
}

/**
 * Fetches a single book by its slug from the API.
 *
 * @param {string} slug - The slug of the book to fetch.
 * @returns {Promise<Book | string>} A promise that resolves to a Book object if the request is successful, or a string error message if an error occurs.
 */
export async function getBookBySlug(slug: string): Promise<Book | string> {
  try {
    const response = await axios.get<Book>(`${BASE_URL}/${slug}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching book with slug ${slug}:`, error.message);
      return `Error: ${error.message}`;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred";
    }
  }
}
