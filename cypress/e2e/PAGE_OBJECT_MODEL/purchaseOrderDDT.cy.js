

import LoginPage from '../../support/POM/LoginPage'
import CatalogPage from '../../support/POM/CatalogPage'
import ProductPage from '../../support/POM/ProductPage'
import CartPage from '../../support/POM/CartPage'
import CheckoutPage from '../../support/POM/CheckoutPage'

describe('Purchase Order DDT - Sauce Demo', () => {

    const loginPage = new LoginPage()
    const catalogPage = new CatalogPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()

    // ═══════════════════════════════════════════════
    // LOAD DATA DARI FIXTURE (Data Driven Testing)
    // ═══════════════════════════════════════════════
    let purchaseOrderData

    before(() => {
        cy.fixture('checkout/purchaseOrder').then((data) => {
            purchaseOrderData = data
        })
    })

    // ═══════════════════════════════════════════════
    // DDT: ITERASI SETIAP DATA SET
    // Setiap iterasi menjalankan full purchase flow
    // dengan data product & checkout yang berbeda
    // ═══════════════════════════════════════════════
    it('DDT - User dapat melakukan purchase order dengan berbagai produk', () => {

        purchaseOrderData.forEach((data, index) => {

            cy.log(`══════════════════════════════════════`)
            cy.log(`🛒 ${data.testName}`)
            cy.log(`   Product: ${data.productName}`)
            cy.log(`══════════════════════════════════════`)

            // ── Step 1: Login menggunakan LoginPage POM ──
            loginPage.visit()
            loginPage.login(data.username, data.password)
            loginPage.verifyLoginSuccess()

            // ── Step 2: Verifikasi halaman Catalog ──
            catalogPage.verifyCatalogPage()

            // ── Step 3: Pilih product dari data ──
            catalogPage.selectProduct(data.productName)
            productPage.verifyProductPage(data.productName)

            // ── Step 4: Add to Cart ──
            productPage.addToCart()

            // ── Step 5: Navigasi ke halaman Cart ──
            cartPage.clickHeaderCheckout()
            cartPage.verifyCartPage()

            // ── Step 6: Verifikasi product ada di Cart ──
            cartPage.verifyProductInCart(data.productName)

            // ── Step 7: Klik Checkout ──
            cartPage.clickCheckoutButton()

            // ── Step 8: Verifikasi halaman Checkout Step 1 ──
            checkoutPage.verifyCheckoutStepOnePage()

            // ── Step 9: Isi informasi checkout dari data ──
            checkoutPage.fillCheckoutInfo(
                data.firstName,
                data.lastName,
                data.postalCode
            )
            checkoutPage.clickContinue()

            // ── Step 10: Verifikasi halaman Checkout Step 2 (Overview) ──
            checkoutPage.verifyCheckoutStepTwoPage()
            checkoutPage.verifyProductInOverview(data.productName)
            checkoutPage.verifySummaryTotal()

            // ── Step 11: Finish order ──
            checkoutPage.clickFinish()

            // ── Step 12: Verifikasi Checkout Complete ──
            checkoutPage.verifyCheckoutComplete()

            // ── Step 13: Kembali ke halaman Inventory ──
            checkoutPage.clickBackHome()
            checkoutPage.verifyBackToInventory()

            cy.log(`✅ ${data.testName} - SELESAI`)
        })
    })
})
