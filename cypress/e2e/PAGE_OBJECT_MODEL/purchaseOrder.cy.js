/**
 * =====================================================
 * PAGE OBJECT MODEL TEST - PURCHASE ORDER FLOW
 * Website: https://www.saucedemo.com
 * =====================================================
 * Flow: Login → Visit Catalog → Pilih Product → Add to Cart
 *       → Cart → Checkout Step 1 (Info) → Checkout Step 2 (Overview)
 *       → Checkout Complete → Back to Inventory
 * =====================================================
 * POM Files:
 *   - cypress/support/POM/CatalogPage.js
 *   - cypress/support/POM/ProductPage.js
 *   - cypress/support/POM/CartPage.js
 *   - cypress/support/POM/CheckoutPage.js
 * Data:
 *   - cypress/fixtures/checkout/checkoutInfo.json
 * =====================================================
 */

import CatalogPage from '../../support/POM/CatalogPage'
import ProductPage from '../../support/POM/ProductPage'
import CartPage from '../../support/POM/CartPage'
import CheckoutPage from '../../support/POM/CheckoutPage'

describe('Purchase Order Flow - Sauce Demo', () => {

    const catalogPage = new CatalogPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()

    // Load data dari file JSON (Data Driven Testing)
    let checkoutData

    before(() => {
        cy.fixture('checkout/checkoutInfo').then((data) => {
            checkoutData = data
        })
    })

    it('TC01 - User dapat melakukan purchase order sampai selesai', () => {

        const { firstName, lastName, postalCode } = checkoutData

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

        // Step 7: Verifikasi halaman Checkout Step 1 (Your Information)
        checkoutPage.verifyCheckoutStepOnePage()

        // Step 8: Isi informasi checkout dari fixture data
        checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode)
        checkoutPage.clickContinue()

        // Step 9: Verifikasi halaman Checkout Step 2 (Overview)
        checkoutPage.verifyCheckoutStepTwoPage()
        checkoutPage.verifyProductInOverview('Sauce Labs Backpack')
        checkoutPage.verifySummaryTotal()

        // Step 10: Klik Finish untuk menyelesaikan order
        checkoutPage.clickFinish()

        // Step 11: Verifikasi halaman Checkout Complete
        checkoutPage.verifyCheckoutComplete()

        // Step 12: Klik Back Home untuk kembali ke inventory
        checkoutPage.clickBackHome()
        checkoutPage.verifyBackToInventory()
    })
})
