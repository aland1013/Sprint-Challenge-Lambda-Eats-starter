/*global cy */

describe('Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza');
  });

  it('Allows user to add text to the box', () => {
    cy.get('#instructions').type('Please get here soon').should('have.value', 'Please get here soon');
  });

  it('Allows user to select multiple toppings', () => {
    cy.get('#pepperoni').check();
    cy.get('#mushrooms').check();
  });

  it('Allows Adam to order a medium pizza with mushrooms and jalapenos', () => {
    cy.get('#name').type('Adam');
    cy.get('#size').select('M');
    cy.get('#mushrooms').check();
    cy.get('#jalapenos').check();
    cy.get('button').click();

  })
});