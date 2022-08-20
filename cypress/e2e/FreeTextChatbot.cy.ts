const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-13'];

describe('FreeTextChatbot', () => {
  sizes.forEach((size) => {
    context(`device: ${size}`, () => {
      before(() => {
        cy.viewport(size);
        cy.visit('/');
      });

      it('should display initial messages', () => {
        cy.dataCy('chat-message-bot').should('have.length', 3);
      });

      it('should enter text in the input field and get response with entered value', () => {
        cy.dataCy('text-input-field').should('be.enabled');

        // Send answer with inserted value.
        const name = 'Test User Name';
        cy.dataCy('text-input-field').type(name);
        cy.dataCy('text-send-button').click();
        cy.dataCy('chat-message-user').should('have.length', 1);
        cy.dataCy('chat-message-user').should('contain.text', name);

        // Get response of chatbot with inserted value.
        cy.dataCy('chat-message-bot').should('contain.text', name);
      });

      it('should select `Something else` option', () => {
        // Click and verify last user selection.
        cy.dataCy('user-selection-2').should('exist');
        cy.dataCy('user-selection-2').click();
        cy.dataCy('chat-message-user')
          .last()
          .should('have.text', 'Something else');
      });

      it('should insert a free text message', () => {
        cy.dataCy('text-input-field').should('exist');
        cy.dataCy('text-input-field').type('Hello!');
        cy.dataCy('text-send-button').click();
        cy.dataCy('chat-message-bot').should('have.length', 8);
      });

      it('should insert a different free text message', () => {
        cy.dataCy('text-input-field').should('exist');
        cy.dataCy('text-input-field').type('Test');
        cy.dataCy('text-send-button').click();
        cy.dataCy('chat-message-bot').should('have.length', 9);
      });
    });
  });
});
