/**
 * Inserts tests for checking the firstname insertion and correct response
 * of the chatbot. This is a utility function and can be used in the beginning
 * to not repeat yourself writing the tests.
 *
 * @returns {void}
 */
export const checkNameInsertion = (): void => {
  it('should display initial messages', () => {
    cy.dataCy('chat-message-bot').should('have.length', 3);
  });

  it('should enter text in the input field and get response with entered value', () => {
    cy.dataCy('chat-window').children().should('have.length', 2);
    cy.dataCy('text-input-field').should('be.enabled');

    // Send answer with inserted value.
    const name = 'Test User Name';
    cy.dataCy('text-input-field').type(name);
    cy.dataCy('text-send-button').click();
    cy.dataCy('chat-message-user')
      .should('have.length', 1)
      .should('contain.text', name);

    // Get response of chatbot with inserted value.
    cy.dataCy('chat-message-bot').should('contain.text', name);
  });
};
