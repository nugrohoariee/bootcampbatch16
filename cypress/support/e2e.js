// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './CUSTOM_COMMAND/loginCommands'
import 'cypress-xpath';

// Ignore uncaught exceptions dari third-party scripts Shopify (CAPTCHA, analytics, dll)
Cypress.on('uncaught:exception', (err) => {
    // Return false supaya Cypress tidak gagal karena error dari Shopify
    return false
})