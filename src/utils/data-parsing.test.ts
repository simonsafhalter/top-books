import { describe, it, expect } from "vitest";
import { addRankToBooks } from "./data-parsing";
import { Book } from "@/types/Book";

describe("addRankToBooks", () => {
  it("adds rank to each book based on its index", () => {
    // Arrange
    const books: Book = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
      { title: "Book 3", author: "Author 3" },
    ];

    // Act
    const rankedBooks = addRankToBooks(books);

    // Assert
    expect(rankedBooks).toEqual([
      { title: "Book 1", author: "Author 1", rank: 1 },
      { title: "Book 2", author: "Author 2", rank: 2 },
      { title: "Book 3", author: "Author 3", rank: 3 },
    ]);
  });

  it("returns an empty array if provided an empty array", () => {
    // Assert
    expect(addRankToBooks([])).toEqual([]);
  });

  it("returns an empty array if param not provided", () => {
    // Assert
    expect(addRankToBooks()).toEqual([]);
  });
});
