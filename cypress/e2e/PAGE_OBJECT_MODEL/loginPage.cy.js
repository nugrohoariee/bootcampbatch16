

import LoginPage from '../../support/POM/LoginPage'

describe('Page Object Model - Login Page', () => {

    const loginPage = new LoginPage()
    let loginData

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })

    // ═══════════════════════════════════════════════
    // POSITIVE TEST - Login Valid
    // ═══════════════════════════════════════════════
    it('TC01 - Berhasil login dengan kredensial valid', () => {
        const { user_name, password } = loginData.validLogin

        loginPage.visit()
        loginPage.login(user_name, password)
        loginPage.verifyLoginSuccess()
    })

    // ═══════════════════════════════════════════════
    // NEGATIVE TEST - Login Invalid
    // ═══════════════════════════════════════════════
    it('TC02 - Gagal login dengan kredensial tidak valid', () => {
        const { user_name, password } = loginData.invalidLogin

        loginPage.visit()
        loginPage.login(user_name, password)
        loginPage.verifyLoginFailed()

    })
})
