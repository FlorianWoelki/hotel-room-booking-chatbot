import { checkNameInsertion } from '../util/checkNameInsertion';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-13'];

describe('FreeTextChatbot', () => {
  sizes.forEach((size) => {
    context(`device: ${size}`, () => {
      before(() => {
        cy.viewport(size);
        cy.visit('/');
      });

      checkNameInsertion();

      it('should select `Something else` option', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        // Click and verify last user selection.
        cy.dataCy('user-selection-2').should('exist');
        cy.dataCy('user-selection-2').click();
        cy.dataCy('chat-message-user')
          .last()
          .should('have.text', 'Something else');
      });

      it('should insert a free text message', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('text-input-field').should('exist');
        cy.dataCy('text-input-field').type('Hello!');
        cy.dataCy('text-send-button').click();
        cy.dataCy('chat-message-bot').should('have.length', 8);
      });

      it('should insert a different free text message', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('text-input-field').should('exist');
        cy.dataCy('text-input-field').type('Test');
        cy.dataCy('text-send-button').click();
        cy.dataCy('chat-message-bot').should('have.length', 9);
      });
    });
  });
});
