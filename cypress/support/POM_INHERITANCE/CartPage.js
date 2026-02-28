/**
 * =====================================================
 * PAGE OBJECT MODEL - CART PAGE (WITH INHERITANCE)
 * Website: https://www.saucedemo.com/cart.html
 * =====================================================
 * INHERITANCE yang terjadi:
 *   - Mewarisi pageTitle dari BasePage
 *     → Tidak perlu tulis get pageTitle() lagi!
 *   - Mewarisi visit() dari BasePage
 *     → visit() otomatis ke baseUrl + '/cart.html'
 * =====================================================
 */

import BasePage from './BasePage'

class CartPage extends BasePage {

    // ═══════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════
    constructor() {
        super('/cart.html', 'Your Cart')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS (Khusus CartPage)
    // ═══════════════════════════════════════════════
    // CATATAN: get pageTitle() TIDAK PERLU ditulis!
    // Sudah diwarisi dari BasePage.

    get checkoutButton() {
        return cy.get('[data-test="checkout"]')
    }

    get cartItem() {
        return cy.get('.cart_item')
    }

    get cartItemName() {
        return cy.get('.inventory_item_name')
    }

    get continueShoppingButton() {
        return cy.get('[data-test="continue-shopping"]')
    }

    get removeButton() {
        return cy.get('[data-test^="remove"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Khusus CartPage)
    // ═══════════════════════════════════════════════
    clickCheckoutButton() {
        this.checkoutButton.click()
    }

    clickContinueShopping() {
        this.continueShoppingButton.click()
    }

    removeItem() {
        this.removeButton.first().click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Khusus CartPage)
    // ═══════════════════════════════════════════════
    verifyCartPage() {
        // Menggunakan verifyPage() dari BasePage!
        // Otomatis cek .title berisi 'Your Cart'
        this.verifyPage()
    }

    verifyProductInCart(productName) {
        this.cartItemName.should('contain.text', productName)
    }

    verifyCartItemCount(expectedCount) {
        this.cartItem.should('have.length', expectedCount)
    }

    verifyCartEmpty() {
        this.cartItem.should('not.exist')
    }
}

export default CartPage
