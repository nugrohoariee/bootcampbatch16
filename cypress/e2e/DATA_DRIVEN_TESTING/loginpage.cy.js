
describe('Data Driven Testing - Login Page', () => {

    // Load data dari file JSON
    let loginData

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
    })

    // ═══════════════════════════════════════════════
    // POSITIVE TEST - Login Valid
    // ═══════════════════════════════════════════════
    it('TC01 - Berhasil login dengan kredensial valid', () => {
        const { user_name, password } = loginData.validLogin

        cy.get('#user-name').clear().type(user_name)
        cy.get('#password').clear().type(password)
        cy.get('#login-button').click()

        // Validasi: redirect ke halaman inventory
        cy.url().should('include', '/inventory.html')
        cy.url().should('not.include', 'saucedemo.com/$')
    })

    // ═══════════════════════════════════════════════
    // NEGATIVE TEST - Login Invalid
    // ═══════════════════════════════════════════════
    it('TC02 - Gagal login dengan kredensial tidak valid', () => {
        const { user_name, password } = loginData.invalidLogin

        cy.get('#user-name').clear().type(user_name)
        cy.get('#password').clear().type(password)
        cy.get('#login-button').click()

        // Validasi: tetap di halaman login & muncul pesan error
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('[data-test="error"]').should('be.visible')
    })
})
