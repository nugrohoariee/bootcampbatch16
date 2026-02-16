/// <reference types="cypress" />

/**
 * =====================================================
 * DATA DRIVEN TESTING - LOGIN PAGE
 * Website: https://sauce-demo.myshopify.com/account/login
 * Data   : cypress/fixtures/users/loginUsers.json
 * =====================================================
 */

describe('Data Driven Testing - Login Page', () => {

    // Load data dari file JSON
    let loginData

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })

    beforeEach(() => {
        cy.visit('/account/login')
        cy.url().should('include', '/account/login')
    })

    // ═══════════════════════════════════════════════
    // POSITIVE TEST - Login Valid
    // ═══════════════════════════════════════════════
    it('TC01 - Berhasil login dengan kredensial valid', () => {
        const { user_name, password } = loginData.validLogin

        cy.get('#customer_email').clear().type(user_name)
        cy.get('#customer_password').clear().type(password)
        cy.get('form#customer_login input[type="submit"]').click()
        cy.wait(20000)

        // Validasi: redirect ke halaman account
        cy.url().should('include', '/account')
        cy.url().should('not.include', '/login')
    })

    // ═══════════════════════════════════════════════
    // NEGATIVE TEST - Login Invalid
    // ═══════════════════════════════════════════════
    it('TC02 - Gagal login dengan kredensial tidak valid', () => {
        const { user_name, password } = loginData.invalidLogin

        cy.get('#customer_email').clear().type(user_name)
        cy.get('#customer_password').clear().type(password)
        cy.get('form#customer_login input[type="submit"]').click()

        // Validasi: tetap di halaman login & muncul pesan error
        cy.url().should('include', '/login')
    })
})
