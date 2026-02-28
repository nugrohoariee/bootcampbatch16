/**
 * =====================================================
 * BASE PAGE - PARENT CLASS (INHERITANCE)
 * =====================================================
 * Class ini adalah PARENT / INDUK dari semua Page Object.
 * Semua POM class lain akan "extends" BasePage ini.
 * 
 * KONSEP:
 *   - Constructor  → menyimpan URL & title setiap halaman
 *   - Inheritance  → child class mewarisi semua method ini
 *   - super()      → child class memanggil constructor parent
 * =====================================================
 */

class BasePage {

    // ═══════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════
    /**
     * Constructor menerima URL path dan title halaman.
     * Setiap child class WAJIB memanggil super(url, title)
     * di dalam constructor-nya.
     * 
     * @param {string} url   - URL path halaman (contoh: '/inventory.html')
     * @param {string} title - Judul halaman yang diharapkan (contoh: 'Products')
     */
    constructor(url, title) {
        this.url = url       // Disimpan sebagai property, bisa diakses child
        this.title = title   // Disimpan sebagai property, bisa diakses child
        this.baseUrl = 'https://www.saucedemo.com'
    }

    // ═══════════════════════════════════════════════
    // SHARED ELEMENTS (Diwarisi semua child class)
    // ═══════════════════════════════════════════════
    /**
     * Getter untuk page title element (.title)
     * Karena ada di BasePage, SEMUA child class otomatis punya!
     * Tidak perlu tulis ulang di CatalogPage, CartPage, dll.
     */
    get pageTitle() {
        return cy.get('.title')
    }

    /**
     * Getter untuk hamburger menu (shared di semua halaman)
     */
    get menuButton() {
        return cy.get('#react-burger-menu-btn')
    }

    /**
     * Getter untuk cart icon di header (shared di semua halaman)
     */
    get cartIcon() {
        return cy.get('.shopping_cart_link')
    }

    // ═══════════════════════════════════════════════
    // SHARED ACTIONS (Diwarisi semua child class)
    // ═══════════════════════════════════════════════
    /**
     * Visit halaman menggunakan URL dari constructor.
     * Child class tidak perlu tulis sendiri visit() method
     * kecuali ingin override (menimpa) behavior-nya.
     */
    visit() {
        cy.visit(this.baseUrl + this.url)
    }

    /**
     * Klik cart icon di header - bisa dipanggil dari halaman manapun
     */
    goToCart() {
        this.cartIcon.click()
    }

    /**
     * Buka hamburger menu
     */
    openMenu() {
        this.menuButton.click()
    }

    // ═══════════════════════════════════════════════
    // SHARED ASSERTIONS (Diwarisi semua child class)
    // ═══════════════════════════════════════════════
    /**
     * Verifikasi bahwa halaman yang sedang aktif sesuai
     * dengan title yang disimpan di constructor.
     * 
     * Contoh: CatalogPage constructor punya title 'Products'
     *         → verifyPage() akan cek apakah .title berisi 'Products'
     */
    verifyPage() {
        this.pageTitle.should('contain.text', this.title)
    }

    /**
     * Verifikasi URL halaman saat ini mengandung path dari constructor
     */
    verifyUrl() {
        cy.url().should('include', this.url)
    }

    /**
     * Ambil screenshot dengan nama yang deskriptif
     * @param {string} name - Nama screenshot
     */
    takeScreenshot(name) {
        cy.screenshot(name)
    }

    /**
     * Log informasi halaman ke Cypress log (untuk debugging)
     */
    logPageInfo() {
        cy.log(`📄 Page: ${this.title}`)
        cy.log(`🔗 URL: ${this.baseUrl}${this.url}`)
    }
}

export default BasePage
