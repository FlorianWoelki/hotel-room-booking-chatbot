import { checkNameInsertion } from '../util/checkNameInsertion';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-13'];

describe('ArrangeCallback', () => {
  context('General Enquiry', () => {
    sizes.forEach((size) => {
      context(`device: ${size}`, () => {
        before(() => {
          cy.viewport(size);
          cy.visit('/');
        });

        checkNameInsertion();

        it('should select `Arrange a Call Back` option', () => {
          cy.dataCy('chat-window').children().should('have.length', 2);
          // Click and verify last user selection.
          cy.dataCy('user-selection-1').should('exist');
          cy.dataCy('user-selection-1').click();
          cy.dataCy('chat-message-user')
            .last()
            .should('have.text', 'Arrange a Call Back');

          // Get response from chatbot that should contain two new messages.
          cy.dataCy('chat-message-bot').should('have.length', 8);
        });

        it('should select `General Enquiry` option', () => {
          cy.dataCy('chat-window').children().should('have.length', 2);
          // Click and verify last user selection.
          cy.dataCy('user-selection-1').should('exist');
          cy.dataCy('user-selection-1').click();
          cy.dataCy('chat-message-user')
            .last()
            .should('have.text', 'General Enquiry');

          // Get response from chatbot that should contain two new messages.
          cy.dataCy('chat-message-bot').should('have.length', 10);
        });

        it('should not be able to insert not a valid phone number', () => {
          cy.dataCy('chat-window').children().should('have.length', 2);
          cy.dataCy('text-input-field').type('Test Hello');
          cy.dataCy('text-send-button').should('be.disabled');
        });

        it('should able to insert a valid phone number and send it', () => {
          cy.dataCy('chat-window').children().should('have.length', 2);
          const phoneNumber = '+491515151515';
          cy.dataCy('text-input-field').clear().type(phoneNumber);
          cy.dataCy('text-send-button').should('not.be.disabled');
          cy.dataCy('text-send-button').click();
          cy.dataCy('chat-message-user')
            .last()
            .should('have.text', phoneNumber);
          cy.dataCy('chat-message-bot').should('have.length', 13);
        });

        it('should end conversation', () => {
          cy.dataCy('chat-window').children().should('have.length', 1);
        });
      });
    });
  });
});
