/**
 * =====================================================
 * TEST CASE - LOGIN PAGE (DENGAN INHERITANCE)
 * Website: https://www.saucedemo.com
 * =====================================================
 * Test ini mendemonstrasikan penggunaan POM yang sudah
 * menggunakan INHERITANCE & CONSTRUCTOR.
 * 
 * Perhatikan:
 *   1. Import dari folder POM_INHERITANCE (bukan POM)
 *   2. loginPage.logPageInfo() → method dari BasePage (PARENT)
 *   3. loginPage.login()       → method dari LoginPage (CHILD)
 *   4. loginPage.url           → property dari constructor
 * =====================================================
 */

import LoginPage from '../../support/POM_INHERITANCE/LoginPage'

describe('Login Page Test - Menggunakan POM Inheritance', () => {

    // ═══════════════════════════════════════════════
    // INSTANSIASI: new LoginPage()
    // ═══════════════════════════════════════════════
    // Saat "new LoginPage()" dipanggil:
    //   1. Constructor LoginPage() dijalankan
    //   2. Di dalamnya, super('/', 'Swag Labs') dipanggil
    //   3. Constructor BasePage menyimpan:
    //      - this.url = '/'
    //      - this.title = 'Swag Labs'
    //      - this.baseUrl = 'https://www.saucedemo.com'
    // ═══════════════════════════════════════════════
    const loginPage = new LoginPage()

    let loginData

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })

    // ═══════════════════════════════════════════════
    // TC01 - POSITIVE: Login Valid
    // Menunjukkan constructor property & inherited method
    // ═══════════════════════════════════════════════
    it('TC01 - Login berhasil dengan kredensial valid (demo inheritance)', () => {
        const { user_name, password } = loginData.validLogin

        // 🔷 Method dari PARENT (BasePage) - diwarisi otomatis!
        loginPage.logPageInfo()  // Log: "📄 Page: Swag Labs" dan "🔗 URL: .../""

        // 🔷 Method dari PARENT (BasePage) - visit() pakai this.url dari constructor
        loginPage.visit()

        // 🟢 Method dari CHILD (LoginPage) - khusus login
        loginPage.login(user_name, password)

        // 🟢 Method dari CHILD (LoginPage) - khusus login
        loginPage.verifyLoginSuccess()
    })

    // ═══════════════════════════════════════════════
    // TC02 - NEGATIVE: Login Invalid
    // ═══════════════════════════════════════════════
    it('TC02 - Login gagal dengan kredensial invalid (demo inheritance)', () => {
        const { user_name, password } = loginData.invalidLogin

        // 🔷 PARENT method
        loginPage.visit()

        // 🟢 CHILD method
        loginPage.login(user_name, password)
        loginPage.verifyLoginFailed()
    })

    // ═══════════════════════════════════════════════
    // TC03 - NEGATIVE: Locked User
    // ═══════════════════════════════════════════════
    it('TC03 - Login gagal karena user terkunci (demo inheritance)', () => {
        const { user_name, password } = loginData.lockedUser

        loginPage.visit()
        loginPage.loginAndVerify(user_name, password, 'locked')
    })

    // ═══════════════════════════════════════════════
    // TC04 - Demo akses property CONSTRUCTOR
    // ═══════════════════════════════════════════════
    it('TC04 - Verifikasi property dari constructor', () => {
        // 🔷 Property dari CONSTRUCTOR (via super())
        cy.log(`URL dari constructor: ${loginPage.url}`)         // '/'
        cy.log(`Title dari constructor: ${loginPage.title}`)     // 'Swag Labs'
        cy.log(`Base URL dari constructor: ${loginPage.baseUrl}`) // 'https://www.saucedemo.com'

        // Assertion untuk membuktikan constructor bekerja
        expect(loginPage.url).to.equal('/')
        expect(loginPage.title).to.equal('Swag Labs')
        expect(loginPage.baseUrl).to.equal('https://www.saucedemo.com')
    })
})
