/**
 * =====================================================
 * PAGE OBJECT MODEL - LOGIN PAGE (Custom Command)
 * Website: https://www.saucedemo.com/
 * =====================================================
 * Class ini digunakan oleh Custom Commands sebagai
 * layer abstraksi untuk halaman login
 * =====================================================
 */

class LoginPageCC {

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

    get errorMessage() {
        return cy.get('[data-test="error"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Methods)
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('/')
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

    verifyLockedOut() {
        this.errorMessage.should('be.visible')
        this.errorMessage.should('contain', 'locked out')
    }

    verifyEmptyFieldError() {
        this.errorMessage.should('be.visible')
        this.errorMessage.should('contain', 'Username is required')
    }
}

export default LoginPageCC
