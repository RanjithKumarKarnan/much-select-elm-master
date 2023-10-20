describe("the multi select example", () => {
  it("allows multiple selections", () => {
    cy.visit("/multi-select-example/");
    cy.get("much-select").click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .find("[data-value='Java']")
      .click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .find("[data-value='Go']")
      .click();
    cy.get("much-select").should("have.attr", "selected-value", "Java,Go");
  });
  it("filters the dropdown based on what the user types", () => {
    cy.visit("/multi-select-example/");
    cy.get("much-select").click();
    cy.get("much-select")
      .shadow()
      .find("#input-filter")
      .click()
      .wait(1000)
      .type("jav");
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .children()
      .should("have.attr", "data-value", "Java");
  });
  it("the first item in the dropdown should be highlighted", () => {
    cy.visit("/multi-select-example/");
    cy.get("much-select").click();
    cy.get("much-select").shadow().find("#input-filter").click().type("al");
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .children()
      .first()
      .should("have.class", "highlighted");
  });
});
