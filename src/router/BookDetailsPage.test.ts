import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { getBookBySlug } from "@/api/books";
import BookDetailsPage from "./BookDetailsPage.vue";
import BookDetails from "@/components/BookDetails.vue";

// Mock the API call
vi.mock("@/api/books", () => ({
  getBookBySlug: vi.fn(),
}));

describe("BookDetailsPage", () => {
  // Setup router mock
  const router = createRouterMock();
  beforeEach(() => {
    injectRouterMock(router);
  });

  it("displays an error message for an invalid ID", async () => {
    // Arrange
    router.setParams({ slug: null });

    // Act
    const wrapper = mount(BookDetailsPage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises(); // Process the URL param

    // Assert
    expect(wrapper.text()).toContain("Invalid ID");
  });

  it("displays a not found message when no book is found", async () => {
    // Arrange
    router.setParams({ slug: "nonexistent-slug" });
    getBookBySlug.mockResolvedValue("Book not found");

    // Act
    const wrapper = mount(BookDetailsPage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises(); // Process the URL param and resolve the API call

    // Assert
    expect(getBookBySlug).toHaveBeenCalledWith("nonexistent-slug");
    expect(wrapper.text()).toContain("Book not found");
  });

  it("loads and displays book details successfully", async () => {
    // Arrange

    router.setParams({ slug: "valid-slug" });
    const mockBook = { title: "Test Book", slug: "valid-slug" };
    getBookBySlug.mockResolvedValue(mockBook);

    const wrapper = mount(BookDetailsPage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises(); // Process the URL param and resolve the API call

    expect(getBookBySlug).toHaveBeenCalledWith("valid-slug");
    expect(wrapper.findComponent(BookDetails).exists()).toBe(true);
    expect(wrapper.text()).toContain(mockBook.title);
  });
});
