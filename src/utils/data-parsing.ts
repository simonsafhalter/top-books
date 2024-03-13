import { Book } from "@/types/Book";

export function addRankToBooks(books: Book[] = []): Book[] {
  return books.map((book, index) => ({
    ...book,
    rank: index + 1,
  }));
}
