/**
 * =====================================================
 * PAGE OBJECT MODEL - LOGIN PAGE
 * Website: https://www.saucedemo.com/
 * =====================================================
 * Class ini berisi semua element & action untuk halaman login
 * =====================================================
 */

class LoginPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS (Selectors)
    // ═══════════════════════════════════════════════
    get usernameField() {
        return cy.get('#user-name')
    }

    get passwordField() {
        return cy.get('#password')
    }

    get submitButton() {
        return cy.get('#login-button')
    }

    get loginForm() {
        return cy.get('.login-box')
    }

    get errorMessage() {
        return cy.get('[data-test="error"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Methods)
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
    }

    fillUsername(username) {
        this.usernameField.clear().type(username)
    }

    fillPassword(password) {
        this.passwordField.clear().type(password)
    }

    clickSubmit() {
        this.submitButton.click()
    }

    login(username, password) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickSubmit()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Validasi)
    // ═══════════════════════════════════════════════
    verifyLoginSuccess() {
        cy.url().should('include', '/inventory.html')
    }

    verifyLoginFailed() {
        cy.url().should('eq', 'https://www.saucedemo.com/')
        this.errorMessage.should('be.visible')
    }

    verifySubmitButton() {
        this.submitButton.should('be.visible')
    }
}

export default LoginPage
