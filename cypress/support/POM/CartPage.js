/**
 * =====================================================
 * PAGE OBJECT MODEL - CART PAGE
 * Website: https://sauce-demo.myshopify.com/cart
 * =====================================================
 */

class CartPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get pageTitle() {
        return cy.contains('My Cart');
    }

    get checkoutButton() {
        return cy.get('input[type="submit"][name="checkout"], button[name="checkout"]').first()
    }

    get cartTable() {
        return cy.get('div.six > div.info > h3');
    }

    get headerCheckoutLink() {
        return cy.xpath('//a[normalize-space()="Check Out"]');
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('/cart')
        cy.url().should('include', '/cart')
    }

    clickHeaderCheckout() {
        this.headerCheckoutLink.click()
    }

    clickCheckoutButton() {
        this.checkoutButton.click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyCartPage() {
        this.pageTitle.should('be.visible')
    }

    verifyProductInCart(productName) {
        this.cartTable.should('contain.text', productName)
    }

    verifyCheckoutPage() {
        cy.url().should('include', '/checkouts')
    }
}

export default CartPage
