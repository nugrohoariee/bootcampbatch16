/**
 * =====================================================
 * TEST FILE - LOGIN CUSTOM COMMAND + DDT + POM
 * =====================================================
 * Mendemonstrasikan penggunaan:
 * 1. Custom Commands (cy.login, cy.loginInvalid, dll)
 * 2. Data-Driven Testing (fixture JSON)
 * 3. POM (dipanggil oleh custom commands di belakang layar)
 * =====================================================
 */

describe('Custom Command + DDT + POM - Login Test', () => {

    let loginData

    before(() => {
        cy.fixture('users/loginCustomCommand').then((data) => {
            loginData = data
        })
    })

    // ═══════════════════════════════════════════════
    // TC01 - Login Valid (cy.login)
    // ═══════════════════════════════════════════════
    it('TC01 - Berhasil login dengan cy.login()', () => {
        const { user_name, password } = loginData.validLogin

        // Custom command: visit + login + verifikasi berhasil (1 baris!)
        cy.login(user_name, password)
    })

    // ═══════════════════════════════════════════════
    // TC02 - Login Invalid (cy.loginInvalid)
    // ═══════════════════════════════════════════════
    it('TC02 - Gagal login dengan cy.loginInvalid()', () => {
        const { user_name, password } = loginData.invalidLogin

        // Custom command: visit + login + verifikasi error message
        cy.loginInvalid(user_name, password)
    })

    // ═══════════════════════════════════════════════
    // TC03 - Locked User (cy.loginLocked)
    // ═══════════════════════════════════════════════
    it('TC03 - Locked user dengan cy.loginLocked()', () => {
        const { user_name, password } = loginData.lockedUser

        // Custom command: visit + login + verifikasi pesan "locked out"
        cy.loginLocked(user_name, password)
    })

    // ═══════════════════════════════════════════════
    // TC04 - Empty Field (cy.fillLoginForm)
    // ═══════════════════════════════════════════════
    it('TC04 - Empty field dengan cy.fillLoginForm()', () => {
        const { user_name, password } = loginData.emptyUser

        // Custom command: visit + isi form (handle empty) + klik submit
        cy.fillLoginForm(user_name, password)

        // Assertion manual — karena fillLoginForm tidak punya assertion bawaan
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username is required')
    })

    // ═══════════════════════════════════════════════
    // TC05 - DDT Loop: Semua Skenario dengan forEach
    // ═══════════════════════════════════════════════
    describe('TC05 - DDT Loop: Semua Skenario Login', () => {

        // Data dari fixture array "allScenarios"
        // Menggunakan forEach untuk generate test case dinamis
        const scenarios = [
            { title: 'Login Valid', expected: 'success', command: 'login' },
            { title: 'Login Invalid', expected: 'failed', command: 'loginInvalid' },
            { title: 'Locked User', expected: 'locked', command: 'loginLocked' }
        ]

        scenarios.forEach((scenario) => {
            it(`DDT - ${scenario.title}`, function () {
                // Ambil data dari fixture berdasarkan index
                cy.fixture('users/loginCustomCommand').then((data) => {
                    const matchingData = data.allScenarios.find(
                        (s) => s.expected === scenario.expected
                    )

                    // Panggil custom command secara dinamis
                    cy[scenario.command](matchingData.user_name, matchingData.password)
                })
            })
        })
    })
})
