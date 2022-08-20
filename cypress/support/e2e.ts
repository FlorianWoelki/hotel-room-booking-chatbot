// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       *
       * @param {string} value The selector of the element.
       * @returns {Chainable<Element>} The element that will be returned.
       */
      dataCy(value: string): Chainable<JQuery<Element>>;
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});
