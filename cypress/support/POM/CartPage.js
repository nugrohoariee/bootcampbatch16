/**
 * =====================================================
 * PAGE OBJECT MODEL - CART PAGE
 * Website: https://www.saucedemo.com/cart.html
 * =====================================================
 */

class CartPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get pageTitle() {
        return cy.get('.title')
    }

    get checkoutButton() {
        return cy.get('[data-test="checkout"]')
    }

    get cartItem() {
        return cy.get('.cart_item')
    }

    get cartItemName() {
        return cy.get('.inventory_item_name')
    }

    get headerCartLink() {
        return cy.get('.shopping_cart_link')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('https://www.saucedemo.com/cart.html')
        cy.url().should('include', '/cart.html')
    }

    clickHeaderCheckout() {
        this.headerCartLink.click()
    }

    clickCheckoutButton() {
        this.checkoutButton.click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyCartPage() {
        this.pageTitle.should('contain.text', 'Your Cart')
    }

    verifyProductInCart(productName) {
        this.cartItemName.should('contain.text', productName)
    }

    verifyCheckoutPage() {
        cy.url().should('include', '/checkout-step-one.html')
    }
}

export default CartPage
