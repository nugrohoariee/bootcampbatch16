/**
 * =====================================================
 * PAGE OBJECT MODEL TEST - PURCHASE ORDER FLOW
 * Website: https://sauce-demo.myshopify.com
 * =====================================================
 * Flow: Visit Catalog → Pilih Product → Add to Cart
 *       → Klik Header Checkout → Klik Button Checkout
 * =====================================================
 * POM Files:
 *   - cypress/support/POM/CatalogPage.js
 *   - cypress/support/POM/ProductPage.js
 *   - cypress/support/POM/CartPage.js
 * =====================================================
 */

import CatalogPage from '../../support/POM/CatalogPage'
import ProductPage from '../../support/POM/ProductPage'
import CartPage from '../../support/POM/CartPage'

describe('Purchase Order Flow - Guest User', () => {

    const catalogPage = new CatalogPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()

    it('TC01 - Guest user dapat melakukan purchase order', () => {

        // Step 1: Visit halaman Catalog
        catalogPage.visit()
        catalogPage.verifyCatalogPage()

        // Step 2: Pilih product "Grey jacket"
        catalogPage.selectProduct('Grey jacket')
        productPage.verifyProductPage('Grey jacket')

        // Step 3: Add to Cart
        productPage.addToCart()
        cy.wait(5000)

        // Step 4: Klik menu header "Check Out" untuk ke halaman Cart
        cartPage.clickHeaderCheckout()
        cartPage.verifyCartPage()

        // Step 5: Verifikasi product ada di cart
        cartPage.verifyProductInCart('Grey jacket')

        // Step 6: Klik button Checkout di halaman My Cart
        cartPage.clickCheckoutButton()

        // Step 7: Verifikasi redirect ke halaman checkout
        cartPage.verifyCheckoutPage()
    })
})
