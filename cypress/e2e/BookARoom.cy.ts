import { checkNameInsertion } from '../util/checkNameInsertion';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-13'];

describe('BookARoom', () => {
  sizes.forEach((size) => {
    context(`device: ${size}`, () => {
      before(() => {
        cy.viewport(size);
        cy.visit('/');
      });

      checkNameInsertion();

      it('should select `Book a Room` option', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('user-selection-0').should('exist').click();
        cy.dataCy('chat-message-user')
          .last()
          .should('have.text', 'Book a Room');
      });

      ['adult guests', 'children', 'rooms'].forEach((key) => {
        it(`should only be able to insert numbers for the amount of ${key}`, () => {
          cy.dataCy('chat-window').children().should('have.length', 2);
          cy.dataCy('text-input-field')
            .should('not.be.disabled')
            .type('Hello!');
          cy.dataCy('text-send-button').should('be.disabled');

          cy.dataCy('text-input-field').clear().type('3');
          cy.dataCy('text-send-button').should('not.be.disabled').click();
        });
      });

      it('should select a date range that is not in the past', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        const now = new Date();
        now.setDate(now.getDate() + 1);
        const tomorrow = now;
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nowDate =
          now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const tomorrowDate =
          tomorrow.getDate() < 10
            ? `0${tomorrow.getDate()}`
            : tomorrow.getDate();

        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('calendar-input-field').click();

        cy.get('.react-datepicker').should('exist');
        cy.get('.react-datepicker')
          .get(`.react-datepicker__day--0${nowDate}`)
          .click();
        cy.get('.react-datepicker')
          .get(`.react-datepicker__day--0${tomorrowDate}`)
          .click();

        const format = `${now.toLocaleString('de-DE', {
          dateStyle: 'medium',
        })} - ${tomorrow.toLocaleString('de-DE', { dateStyle: 'medium' })}`;
        cy.dataCy('calendar-input-field').should('contain.text', format);

        cy.dataCy('chat-date-picker-outside-button').click({ force: true });
        cy.get('.react-datepicker').should('not.exist');

        cy.dataCy('date-send-button').click();
        cy.dataCy('chat-message-user').last().should('have.text', format);
      });

      it('should select breakfast', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('user-selection-0').click();
        cy.dataCy('chat-message-user').last().should('have.text', 'Yes please');
      });

      it('should insert a valid phone number', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('text-input-field').type('Test Hello');
        cy.dataCy('text-send-button').should('be.disabled');

        const phoneNumber = '+491515151515';
        cy.dataCy('text-input-field').clear().type(phoneNumber);
        cy.dataCy('text-send-button').should('not.be.disabled').click();
        cy.dataCy('chat-message-user').last().should('have.text', phoneNumber);
      });

      it('should insert a valid email address', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('text-input-field').type('Test Hello');
        cy.dataCy('text-send-button').should('be.disabled');

        const email = 'test@test.de';
        cy.dataCy('text-input-field').clear().type(email);
        cy.dataCy('text-send-button').should('not.be.disabled').click();
        cy.dataCy('chat-message-user').last().should('have.text', email);
      });

      it('should send link when clicking on `Pay now with Credit Card`', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('user-selection-1').click();
        cy.dataCy('chat-message-user')
          .last()
          .should('have.text', 'Pay now with Credit Card');
      });

      it('should click on stripe payment link', () => {
        cy.dataCy('chat-window').children().should('have.length', 2);
        cy.dataCy('user-input-link').get('a').invoke('removeAttr', 'href');
        cy.dataCy('user-input-link').get('a').invoke('removeAttr', 'target');
        cy.dataCy('user-input-link').click();
        cy.dataCy('chat-message-user')
          .last()
          .should('have.text', 'Go to Stripe');
      });

      it('should end conversation', () => {
        cy.dataCy('chat-window').children().should('have.length', 1);
      });
    });
  });
});
