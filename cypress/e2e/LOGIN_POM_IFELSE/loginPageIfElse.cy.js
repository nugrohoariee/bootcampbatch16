/**
 * =====================================================
 * TEST CASE - LOGIN PAGE DENGAN IF-ELSE OPERATOR
 * Website: https://www.saucedemo.com/
 * =====================================================
 * Menggunakan Page Object Model (POM)
 * Menggunakan operator if-else untuk kontrol flow assertion
 * =====================================================
 */

import LoginPage from '../../support/POM/LoginPage'

describe('Login Page - POM dengan Operator If-Else', () => {

    const loginPage = new LoginPage()
    let loginData

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })

    // ═══════════════════════════════════════════════
    // TC01 - Login Valid (if branch: success)
    // ═══════════════════════════════════════════════
    it('TC01 - Login valid → if-else memilih branch SUCCESS', () => {
        const { user_name, password } = loginData.validLogin

        loginPage.visit()

        // Menggunakan method loginAndVerify yang pakai if-else di dalam POM
        // expectedResult = 'success' → masuk ke branch IF pertama
        loginPage.loginAndVerify(user_name, password, 'success')
    })

    // ═══════════════════════════════════════════════
    // TC02 - Login Invalid (else branch: failed)
    // ═══════════════════════════════════════════════
    it('TC02 - Login invalid → if-else memilih branch ELSE (failed)', () => {
        const { user_name, password } = loginData.invalidLogin

        loginPage.visit()

        // Menggunakan method loginAndVerify yang pakai if-else di dalam POM
        // expectedResult = 'failed' → masuk ke branch ELSE terakhir
        loginPage.loginAndVerify(user_name, password, 'failed')
    })

    // ═══════════════════════════════════════════════
    // TC03 - Locked User (else-if branch: locked)
    // ═══════════════════════════════════════════════
    it('TC03 - Locked user → if-else memilih branch ELSE-IF (locked)', () => {
        const { user_name, password } = loginData.lockedUser

        loginPage.visit()

        // Menggunakan method loginAndVerify yang pakai if-else di dalam POM
        // expectedResult = 'locked' → masuk ke branch ELSE-IF
        loginPage.loginAndVerify(user_name, password, 'locked')
    })

    // ═══════════════════════════════════════════════
    // TC04 - If-Else di dalam Test File langsung
    // ═══════════════════════════════════════════════
    it('TC04 - Menggunakan if-else langsung di test untuk cek element', () => {

        loginPage.visit()

        // ── IF-ELSE langsung di dalam test file ──
        // Mengecek apakah tombol submit visible, lalu ambil keputusan
        cy.get('body').then(($body) => {

            if ($body.find('#login-button').length > 0) {
                // IF: tombol login ditemukan → halaman login tampil dengan benar
                cy.log('✅ IF: Tombol login DITEMUKAN')
                loginPage.verifySubmitButton()

                // Lanjut: cek apakah username field juga ada
                if ($body.find('#user-name').length > 0) {
                    // IF nested: username field ada → form lengkap
                    cy.log('✅ IF (nested): Username field DITEMUKAN')
                    loginPage.usernameField.should('be.visible')
                    loginPage.passwordField.should('be.visible')
                } else {
                    // ELSE nested: username field tidak ada
                    cy.log('❌ ELSE (nested): Username field TIDAK ditemukan')
                }

            } else {
                // ELSE: tombol login tidak ditemukan → mungkin sudah login
                cy.log('❌ ELSE: Tombol login TIDAK ditemukan')
                cy.url().should('include', '/inventory.html')
            }
        })
    })
})
