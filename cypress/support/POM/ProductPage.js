/**
 * =====================================================
 * PAGE OBJECT MODEL - PRODUCT DETAIL PAGE
 * Website: https://www.saucedemo.com/inventory-item.html
 * =====================================================
 */

class ProductPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get productTitle() {
        return cy.get('.inventory_details_name')
    }

    get addToCartButton() {
        return cy.get('[data-test^="add-to-cart"]')
    }

    get backButton() {
        return cy.get('[data-test="back-to-products"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    addToCart() {
        this.addToCartButton.click()
    }

    goBack() {
        this.backButton.click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyProductPage(productName) {
        this.productTitle.should('contain.text', productName)
    }
}

export default ProductPage
