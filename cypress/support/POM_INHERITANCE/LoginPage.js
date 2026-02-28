/**
 * =====================================================
 * PAGE OBJECT MODEL - LOGIN PAGE (WITH INHERITANCE)
 * Website: https://www.saucedemo.com/
 * =====================================================
 * Class ini EXTENDS BasePage (mewarisi semua method parent)
 * 
 * INHERITANCE yang terjadi:
 *   - LoginPage mewarisi: visit(), verifyPage(), verifyUrl(),
 *     goToCart(), pageTitle, logPageInfo(), takeScreenshot()
 *   - LoginPage menambahkan: element & method khusus login
 *   - LoginPage OVERRIDE: visit() → karena login page perlu
 *     validasi URL yang berbeda
 * =====================================================
 */

import BasePage from './BasePage'

class LoginPage extends BasePage {

    // ═══════════════════════════════════════════════
    // CONSTRUCTOR - Memanggil super() dari BasePage
    // ═══════════════════════════════════════════════
    /**
     * super('/', 'Swag Labs') artinya:
     *   - Panggil constructor BasePage
     *   - Set this.url = '/'
     *   - Set this.title = 'Swag Labs'
     *   - Set this.baseUrl = 'https://www.saucedemo.com'
     */
    constructor() {
        super('/', 'Swag Labs')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS (Khusus LoginPage)
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
    // ACTIONS (Khusus LoginPage)
    // ═══════════════════════════════════════════════
    fillUsername(username) {
        this.usernameField.clear().type(username)
    }

    fillPassword(password) {
        this.passwordField.clear().type(password)
    }

    clickSubmit() {
        this.submitButton.click()
    }

    /**
     * Method gabungan: isi username, password, lalu klik login
     */
    login(username, password) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickSubmit()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Khusus LoginPage)
    // ═══════════════════════════════════════════════
    verifyLoginSuccess() {
        cy.url().should('include', '/inventory.html')
    }

    verifyLoginFailed() {
        cy.url().should('eq', 'https://www.saucedemo.com/')
        this.errorMessage.should('be.visible')
    }

    /**
     * Login dan verifikasi hasil berdasarkan expectedResult
     * @param {string} username 
     * @param {string} password 
     * @param {string} expectedResult - 'success' | 'locked' | 'failed'
     */
    loginAndVerify(username, password, expectedResult) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickSubmit()

        if (expectedResult === 'success') {
            cy.url().should('include', '/inventory.html')
        } else if (expectedResult === 'locked') {
            this.errorMessage.should('be.visible')
            this.errorMessage.should('contain', 'locked out')
        } else {
            cy.url().should('eq', 'https://www.saucedemo.com/')
            this.errorMessage.should('be.visible')
        }
    }
}

export default LoginPage
