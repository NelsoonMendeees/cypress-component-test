Cypress.Commands.add("alertErrorHaveText", (expectedText) => {
  cy.contains(".alert-error", expectedText).should("be.visible");
});

Cypress.Commands.add("addNewCard", (card) => {
  cy.intercept("POST", "http://wallet.cardfify.dev/api/cards", (req) => {
    req.reply({
      statusCode: 201,
      body: card,
    });
  }).as("addCard");

  cy.get("[data-cy=number]").type(card.number);
  cy.get("[data-cy=holderName]").type(card.holderName);
  cy.get("[data-cy=expirationDate]").type(card.expirationDate);
  cy.get("[data-cy=cvv]").type(card.cvv);
  cy.contains("button", card.bank).click();

  cy.get("[data-cy='save-my-card']").click();
  if (card.scenario) {
    cy.alertErrorHaveText(card.text);
  } else {
    cy.wait("@addCard");

    cy.get(".notice-success")
      .should("be.visible")
      .and("have.text", card.text);
  }
});
