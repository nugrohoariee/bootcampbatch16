/**
 * =====================================================
 * PAGE OBJECT MODEL - LOGIN PAGE
 * Website: https://sauce-demo.myshopify.com/account/login
 * =====================================================
 * Class ini berisi semua element & action untuk halaman login
 * =====================================================
 */

class LoginPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS (Selectors)
    // ═══════════════════════════════════════════════
    get emailField() {
        return cy.get('#customer_email')
    }

    get passwordField() {
        return cy.get('#customer_password')
    }

    get submitButton() {
        return cy.get('form#customer_login input[type="submit"]')
    }

    get loginForm() {
        return cy.get('form#customer_login')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Methods)
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('/account/login')
        cy.url().should('include', '/account/login')
    }

    fillEmail(email) {
        this.emailField.clear().type(email)
    }

    fillPassword(password) {
        this.passwordField.clear().type(password)
    }

    clickSubmit() {
        this.submitButton.click()
    }

    login(email, password) {
        this.fillEmail(email)
        this.fillPassword(password)
        this.clickSubmit()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Validasi)
    // ═══════════════════════════════════════════════
    verifyLoginSuccess() {
        cy.url().should('include', '/account')
        cy.url().should('not.include', '/login')
    }

    verifyLoginFailed() {
        cy.url().should('include', '/login')
    }
}

export default LoginPage
