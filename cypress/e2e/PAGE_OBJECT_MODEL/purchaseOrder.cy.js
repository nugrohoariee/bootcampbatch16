/**
 * =====================================================
 * PAGE OBJECT MODEL TEST - PURCHASE ORDER FLOW
 * Website: https://www.saucedemo.com
 * =====================================================
 * Flow: Login → Visit Catalog → Pilih Product → Add to Cart
 *       → Klik Header Cart → Verifikasi Cart → Klik Checkout
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

describe('Purchase Order Flow - Sauce Demo', () => {

    const catalogPage = new CatalogPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()

    it('TC01 - User dapat melakukan purchase order', () => {

        // Step 1: Login & Visit halaman Catalog (Inventory)
        catalogPage.visit()
        catalogPage.verifyCatalogPage()

        // Step 2: Pilih product "Sauce Labs Backpack"
        catalogPage.selectProduct('Sauce Labs Backpack')
        productPage.verifyProductPage('Sauce Labs Backpack')

        // Step 3: Add to Cart
        productPage.addToCart()

        // Step 4: Klik cart icon di header untuk ke halaman Cart
        cartPage.clickHeaderCheckout()
        cartPage.verifyCartPage()

        // Step 5: Verifikasi product ada di cart
        cartPage.verifyProductInCart('Sauce Labs Backpack')

        // Step 6: Klik button Checkout di halaman Cart
        cartPage.clickCheckoutButton()

        // Step 7: Verifikasi redirect ke halaman checkout
        cartPage.verifyCheckoutPage()
    })
})
