import React from "react";
import AddCard from "./AddCard";
import payload from "../../cypress/fixtures/cards.json";

describe("<AddCard />", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });
  it("exibe erros quando os campos não são preenchidos", () => {
    const { errorMessage } = payload;
    cy.mount(<AddCard />);
    cy.contains("button", "Adicionar Cartão").click();
    errorMessage.forEach((message) => {
      cy.alertErrorHaveText(message);
    });
  });

  it("deve cadastrar um novo cartao de credito", () => {
    const { validCard } = payload;
    cy.mount(<AddCard />);
    cy.addNewCard(validCard);
  });

  it("deve validar numero do cartão de crédito", () => {
    const { badNumberCard } = payload;
    cy.mount(<AddCard />);
    cy.addNewCard(badNumberCard);
  });

  it("deve validar nome do titular com menos de 2 caracteres", () => {
    const { badNameCard } = payload;
    cy.mount(<AddCard />);
    cy.addNewCard(badNameCard);
  });

  it("deve validar a data de validade do cartão", () => {
    const { badDateCard } = payload;
    cy.mount(<AddCard />);
    cy.addNewCard(badDateCard);
  });

  it("deve validar o codigo cvv do cartão", () => {
    const { badCvvCard } = payload;
    cy.mount(<AddCard />);
    cy.addNewCard(badCvvCard);
  });
});
