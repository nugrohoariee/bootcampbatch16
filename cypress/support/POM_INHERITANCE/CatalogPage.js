/**
 * =====================================================
 * PAGE OBJECT MODEL - CATALOG PAGE (WITH INHERITANCE)
 * Website: https://www.saucedemo.com/inventory.html
 * =====================================================
 * INHERITANCE yang terjadi:
 *   - CatalogPage mewarisi pageTitle dari BasePage
 *     → Tidak perlu tulis get pageTitle() lagi!
 *   - CatalogPage mewarisi verifyPage() dari BasePage
 *     → verifyPage() otomatis cek title 'Products'
 * =====================================================
 */

import BasePage from './BasePage'

class CatalogPage extends BasePage {

    // ═══════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════
    /**
     * super('/inventory.html', 'Products') artinya:
     *   - this.url = '/inventory.html'
     *   - this.title = 'Products'
     * 
     * Sehingga saat memanggil:
     *   - this.verifyPage() → cek apakah .title berisi 'Products'
     *   - this.verifyUrl()  → cek apakah URL mengandung '/inventory.html'
     */
    constructor() {
        super('/inventory.html', 'Products')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS (Khusus CatalogPage)
    // ═══════════════════════════════════════════════
    // CATATAN: get pageTitle() TIDAK PERLU ditulis di sini!
    // Karena sudah ada di BasePage dan diwarisi otomatis.

    get inventoryItems() {
        return cy.get('.inventory_item')
    }

    get sortDropdown() {
        return cy.get('.product_sort_container')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Khusus CatalogPage)
    // ═══════════════════════════════════════════════
    selectProduct(productName) {
        cy.contains('.inventory_item_name', productName).click()
    }

    /**
     * Sort produk berdasarkan opsi yang dipilih
     * @param {string} sortOption - 'az' | 'za' | 'lohi' | 'hilo'
     */
    sortProducts(sortOption) {
        this.sortDropdown.select(sortOption)
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Khusus CatalogPage)
    // ═══════════════════════════════════════════════
    // CATATAN: verifyCatalogPage() bisa diganti dengan verifyPage()
    // dari BasePage! Tapi kita tetap simpan sebagai alias.
    verifyCatalogPage() {
        // Memanggil method PARENT (BasePage)
        this.verifyPage()
    }

    verifyProductCount(expectedCount) {
        this.inventoryItems.should('have.length', expectedCount)
    }
}

export default CatalogPage
