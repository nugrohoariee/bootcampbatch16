/**
 * =====================================================
 * PAGE OBJECT MODEL - PRODUCT DETAIL PAGE (WITH INHERITANCE)
 * Website: https://www.saucedemo.com/inventory-item.html
 * =====================================================
 * INHERITANCE yang terjadi:
 *   - Mewarisi visit(), verifyUrl(), goToCart() dari BasePage
 *   - Menambahkan element & method khusus product detail
 * =====================================================
 */

import BasePage from './BasePage'

class ProductPage extends BasePage {

    // ═══════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════
    constructor() {
        super('/inventory-item.html', 'Product Detail')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS (Khusus ProductPage)
    // ═══════════════════════════════════════════════
    get productTitle() {
        return cy.get('.inventory_details_name')
    }

    get productPrice() {
        return cy.get('.inventory_details_price')
    }

    get productDescription() {
        return cy.get('.inventory_details_desc')
    }

    get addToCartButton() {
        return cy.get('[data-test^="add-to-cart"]')
    }

    get backButton() {
        return cy.get('[data-test="back-to-products"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS (Khusus ProductPage)
    // ═══════════════════════════════════════════════
    addToCart() {
        this.addToCartButton.click()
    }

    goBack() {
        this.backButton.click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS (Khusus ProductPage)
    // ═══════════════════════════════════════════════
    verifyProductPage(productName) {
        this.productTitle.should('contain.text', productName)
    }

    verifyProductPrice(expectedPrice) {
        this.productPrice.should('contain.text', expectedPrice)
    }
}

export default ProductPage
