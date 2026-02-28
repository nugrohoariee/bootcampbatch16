/**
 * =====================================================
 * CUSTOM COMMANDS - LOGIN
 * =====================================================
 * Custom commands yang memanggil POM (LoginPageCC)
 * di dalamnya — TIDAK menduplikasi logic
 * =====================================================
 * Cara pakai di test file:
 *   cy.login('standard_user', 'secret_sauce')
 *   cy.loginInvalid('wrong_user', 'wrong_pass')
 *   cy.loginLocked('locked_out_user', 'secret_sauce')
 *   cy.fillLoginForm('user', 'pass')
 * =====================================================
 */

import LoginPageCC from '../POM_CUSTOM_COMMAND/LoginPageCC'

const loginPage = new LoginPageCC()

// ═══════════════════════════════════════════════
// cy.login() — Login valid + verifikasi berhasil
// ═══════════════════════════════════════════════
Cypress.Commands.add('login', (username, password) => {
    loginPage.visit()
    loginPage.login(username, password)
    loginPage.verifyLoginSuccess()
})

// ═══════════════════════════════════════════════
// cy.loginInvalid() — Login invalid + verifikasi gagal
// ═══════════════════════════════════════════════
Cypress.Commands.add('loginInvalid', (username, password) => {
    loginPage.visit()
    loginPage.login(username, password)
    loginPage.verifyLoginFailed()
})

// ═══════════════════════════════════════════════
// cy.loginLocked() — Login locked user + verifikasi
// ═══════════════════════════════════════════════
Cypress.Commands.add('loginLocked', (username, password) => {
    loginPage.visit()
    loginPage.login(username, password)
    loginPage.verifyLockedOut()
})

// ═══════════════════════════════════════════════
// cy.fillLoginForm() — Isi form saja tanpa assertion
// Berguna untuk test case custom (misal empty field)
// ═══════════════════════════════════════════════
Cypress.Commands.add('fillLoginForm', (username, password) => {
    loginPage.visit()

    // Handle empty field — jangan panggil type() jika string kosong
    if (username) {
        loginPage.fillUsername(username)
    }
    if (password) {
        loginPage.fillPassword(password)
    }

    loginPage.clickSubmit()
})
