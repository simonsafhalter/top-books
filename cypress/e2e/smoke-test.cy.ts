describe("Smoke test", () => {
  it("Browse, filter, select books and add a comment", () => {
    // Load the home page
    cy.visit("/");

    // Input a search term in the search input
    cy.get('[data-cy="search-book-input"]').type("Tra");

    // Click on the 2rd element in the book list
    cy.get('[data-cy="book-list"] > li')
      .eq(1)
      .find('[data-cy="book-cover-link"]')
      .click();

    // Assert that we're on the expected page
    cy.contains("Don Quixote").should("exist");

    // Type a comment
    cy.get('[data-cy="post-comment"] > textarea').type("Test comment 123");

    // Add the comment
    cy.get('[data-cy="post-comment"] > button').click();

    // Assert that the comment we just added exists
    cy.contains("Test comment 123").should("exist");
  });
});
