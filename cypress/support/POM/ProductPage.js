/**
 * =====================================================
 * PAGE OBJECT MODEL - PRODUCT DETAIL PAGE
 * Website: https://sauce-demo.myshopify.com/products/[slug]
 * =====================================================
 */

class ProductPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get productTitle() {
        return cy.get('h1')
    }

    get addToCartButton() {
        return cy.get('input[type="submit"][value="Add to Cart"], button[type="submit"]').first()
    }

    get quantityField() {
        return cy.get('input[name="quantity"]')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    addToCart() {
        this.addToCartButton.click()
    }

    setQuantity(qty) {
        this.quantityField.clear().type(qty)
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyProductPage(productName) {
        this.productTitle.should('contain.text', productName)
    }
}

export default ProductPage
