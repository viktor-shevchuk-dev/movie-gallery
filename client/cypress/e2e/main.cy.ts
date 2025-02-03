describe("Movie App E2E Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:4000/movies", {
      fixture: "movies.json",
    }).as("getMovies");

    cy.visit("/");
  });

  it("fetches and displays movies by genre", () => {
    cy.wait("@getMovies");

    cy.get("h2").should("have.length.above", 0);

    cy.get("h2").then(($els) => {
      const genres = [...$els].map((el) => el.innerText);
      expect(genres).to.include.members([
        "DRAMA",
        "ROMANCE",
        "ANIMATION",
        "ADVENTURE",
        "FAMILY",
        "COMEDY",
        "FANTASY",
        "SCIENCE FICTION",
        "ACTION",
        "MYSTERY",
        "THRILLER",
        "MUSIC",
        "WAR",
        "CRIME",
        "HISTORY",
        "HORROR",
      ]);
    });
  });

  it("navigates through movies using keyboard arrows", () => {
    cy.wait("@getMovies");

    cy.get('[class*="MovieRow_active"]')
      .should("have.length", 1)
      .and("contain.text", "Fifty");

    cy.get("body").focus().type("{rightarrow}");
    cy.get("body").focus().type("{rightarrow}");

    cy.get('[class*="MovieRow_active"]').should("contain.text", "Shape");

    cy.get("body").type("{downarrow}");
    cy.get("body").type("{downarrow}");
    cy.get('[class*="MovieRow_active"]').should("contain.text", "Zootopia");
  });
});
