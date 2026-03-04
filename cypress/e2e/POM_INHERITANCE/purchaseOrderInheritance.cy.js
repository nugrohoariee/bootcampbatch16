

import LoginPage from '../../support/POM_INHERITANCE/LoginPage'
import CatalogPage from '../../support/POM_INHERITANCE/CatalogPage'
import ProductPage from '../../support/POM_INHERITANCE/ProductPage'
import CartPage from '../../support/POM_INHERITANCE/CartPage'
import CheckoutPage from '../../support/POM_INHERITANCE/CheckoutPage'

describe('Purchase Order DDT - POM Inheritance Demo', () => {

    // ═══════════════════════════════════════════════
    // INSTANSIASI SEMUA PAGE OBJECTS
    // ═══════════════════════════════════════════════
    // Setiap "new XxxPage()" menjalankan:
    //   1. Constructor child → super(url, title)
    //   2. Constructor BasePage → this.url, this.title, this.baseUrl
    // ═══════════════════════════════════════════════
    const loginPage = new LoginPage()       // url='/', title='Swag Labs'
    const catalogPage = new CatalogPage()   // url='/inventory.html', title='Products'
    const productPage = new ProductPage()   // url='/inventory-item.html', title='Product Detail'
    const cartPage = new CartPage()         // url='/cart.html', title='Your Cart'
    const checkoutPage = new CheckoutPage() // url='/checkout-step-one.html', title='Checkout: Your Information'

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
    // TC01 - Demo Constructor Property
    // Menunjukkan bahwa setiap page punya URL & title
    // yang disimpan di constructor via super()
    // ═══════════════════════════════════════════════
    it('TC01 - Verifikasi constructor property semua page objects', () => {

        cy.log('═══ CONSTRUCTOR PROPERTIES ═══')

        // Semua property ini berasal dari CONSTRUCTOR (via super())
        cy.log(`LoginPage    → url: "${loginPage.url}", title: "${loginPage.title}"`)
        cy.log(`CatalogPage  → url: "${catalogPage.url}", title: "${catalogPage.title}"`)
        cy.log(`ProductPage  → url: "${productPage.url}", title: "${productPage.title}"`)
        cy.log(`CartPage     → url: "${cartPage.url}", title: "${cartPage.title}"`)
        cy.log(`CheckoutPage → url: "${checkoutPage.url}", title: "${checkoutPage.title}"`)

        // Assertions
        expect(loginPage.url).to.equal('/')
        expect(catalogPage.url).to.equal('/inventory.html')
        expect(cartPage.title).to.equal('Your Cart')
        expect(checkoutPage.title).to.equal('Checkout: Your Information')
    })

    // ═══════════════════════════════════════════════
    // TC02 - DDT Purchase Order Flow (Inheritance)
    // Full flow dengan method dari PARENT & CHILD
    // ═══════════════════════════════════════════════
    it('TC02 - DDT Purchase order menggunakan POM Inheritance', () => {

        purchaseOrderData.forEach((data, index) => {

            cy.log(`══════════════════════════════════════`)
            cy.log(`🛒 ${data.testName}`)
            cy.log(`   Product: ${data.productName}`)
            cy.log(`══════════════════════════════════════`)

            // ── Step 1: Login ──
            // 🔷 loginPage.visit()    → PARENT method (BasePage.visit)
            // 🟢 loginPage.login()    → CHILD method (LoginPage.login)
            loginPage.visit()
            loginPage.login(data.username, data.password)
            loginPage.verifyLoginSuccess()

            // ── Step 2: Catalog ──
            // 🔷 catalogPage.verifyPage()    → PARENT method (BasePage.verifyPage)
            //    otomatis cek .title berisi 'Products' (dari constructor)
            // 🟢 catalogPage.selectProduct() → CHILD method
            catalogPage.verifyPage()
            catalogPage.selectProduct(data.productName)

            // ── Step 3: Product Detail ──
            // 🟢 productPage.verifyProductPage() → CHILD method
            // 🟢 productPage.addToCart()          → CHILD method
            productPage.verifyProductPage(data.productName)
            productPage.addToCart()

            // ── Step 4: Navigasi ke Cart ──
            // 🔷 productPage.goToCart()  → PARENT method (BasePage.goToCart)
            //    Bisa dipanggil dari PAGE MANAPUN karena diwarisi!
            productPage.goToCart()

            // ── Step 5: Cart ──
            // 🔷 cartPage.verifyPage() → PARENT method
            //    otomatis cek .title berisi 'Your Cart' (dari constructor)
            cartPage.verifyPage()
            cartPage.verifyProductInCart(data.productName)

            // ── Step 6: Checkout ──
            cartPage.clickCheckoutButton()
            checkoutPage.verifyCheckoutStepOnePage()

            // ── Step 7: Fill Checkout Info ──
            checkoutPage.fillCheckoutInfo(
                data.firstName,
                data.lastName,
                data.postalCode
            )
            checkoutPage.clickContinue()

            // ── Step 8: Overview ──
            checkoutPage.verifyCheckoutStepTwoPage()
            checkoutPage.verifyProductInOverview(data.productName)
            checkoutPage.verifySummaryTotal()

            // ── Step 9: Finish ──
            checkoutPage.clickFinish()
            checkoutPage.verifyCheckoutComplete()

            // ── Step 10: Back to Inventory ──
            checkoutPage.clickBackHome()
            checkoutPage.verifyBackToInventory()

            cy.log(`✅ ${data.testName} - SELESAI`)
        })
    })
})
