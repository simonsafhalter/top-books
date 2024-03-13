import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { getAllBooks } from "@/api/books";
import BookListPage from "./BookListPage.vue";
import BookList from "@/components/BookList.vue";

// Mock the API call
vi.mock("@/api/books", () => ({
  getAllBooks: vi.fn(),
}));

describe("BookListPage", () => {
  it("displays an error message when fetching books fails", async () => {
    // Arrange
    const errorMessage = "Failed to fetch books";
    getAllBooks.mockResolvedValue(errorMessage);

    // Act
    const wrapper = mount(BookListPage);

    await flushPromises(); // Process the API call

    // Assert
    expect(getAllBooks).toHaveBeenCalled();

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("displays loading initially and then a list of books", async () => {
    // Arrange
    const mockBooks = [
      { title: "Test Book 1", slug: "test-book-1" },
      { title: "Test Book 2", slug: "test-book-2" },
    ];
    getAllBooks.mockResolvedValue({ books: mockBooks });

    // Act
    const wrapper = mount(BookListPage);

    await flushPromises(); // Process the API call

    // Assert
    expect(getAllBooks).toHaveBeenCalled();
    expect(wrapper.findComponent(BookList).exists()).toBe(true);
    expect(wrapper.findAllComponents(BookList).length).toBe(1);
    mockBooks.forEach((book) => {
      expect(wrapper.text()).toContain(book.title);
    });
  });
});
