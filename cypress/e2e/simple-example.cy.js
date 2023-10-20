describe("the simple example", () => {
  it("can select value", () => {
    cy.visit("/simple-example/");
    cy.get("much-select").click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .find("[data-value='Bricks']")
      .click();
    cy.get("much-select").should("have.attr", "selected-value", "Bricks");
  });
  it("shows the dropdown once it's been clicked on", () => {
    cy.visit("/simple-example/");
    cy.get("much-select").click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .should("have.class", "showing");
  });
  it("hides the dropdown after a selection made", () => {
    cy.visit("/simple-example/");
    cy.get("much-select").click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .find("[data-value='Bricks']")
      .click();
    cy.get("much-select")
      .shadow()
      .find("#dropdown")
      .should("have.class", "hiding");
  });
});
