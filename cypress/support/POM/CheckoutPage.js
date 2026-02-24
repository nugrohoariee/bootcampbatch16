/**
 * =====================================================
 * PAGE OBJECT MODEL - CHECKOUT PAGE
 * Website: https://www.saucedemo.com/checkout-step-one.html
 *          https://www.saucedemo.com/checkout-step-two.html
 *          https://www.saucedemo.com/checkout-complete.html
 * =====================================================
 * Halaman checkout terdiri dari 3 step:
 *   Step 1: Isi informasi (nama, zip code)
 *   Step 2: Overview / ringkasan order
 *   Step 3: Konfirmasi order selesai
 * =====================================================
 */

class CheckoutPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS - Step 1: Your Information
    // ═══════════════════════════════════════════════
    get firstNameField() {
        return cy.get('[data-test="firstName"]')
    }

    get lastNameField() {
        return cy.get('[data-test="lastName"]')
    }

    get postalCodeField() {
        return cy.get('[data-test="postalCode"]')
    }

    get continueButton() {
        return cy.get('[data-test="continue"]')
    }

    get cancelButton() {
        return cy.get('[data-test="cancel"]')
    }

    get errorMessage() {
        return cy.get('[data-test="error"]')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS - Step 2: Overview
    // ═══════════════════════════════════════════════
    get finishButton() {
        return cy.get('[data-test="finish"]')
    }

    get summaryInfo() {
        return cy.get('.summary_info')
    }

    get summaryTotal() {
        return cy.get('.summary_total_label')
    }

    get cartItemName() {
        return cy.get('.inventory_item_name')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS - Step 3: Complete
    // ═══════════════════════════════════════════════
    get completeHeader() {
        return cy.get('.complete-header')
    }

    get completeText() {
        return cy.get('.complete-text')
    }

    get backHomeButton() {
        return cy.get('[data-test="back-to-products"]')
    }

    // ═══════════════════════════════════════════════
    // ELEMENTS - Shared
    // ═══════════════════════════════════════════════
    get pageTitle() {
        return cy.get('.title')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS - Step 1: Your Information
    // ═══════════════════════════════════════════════
    fillFirstName(firstName) {
        this.firstNameField.clear().type(firstName)
    }

    fillLastName(lastName) {
        this.lastNameField.clear().type(lastName)
    }

    fillPostalCode(postalCode) {
        this.postalCodeField.clear().type(postalCode)
    }

    fillCheckoutInfo(firstName, lastName, postalCode) {
        this.fillFirstName(firstName)
        this.fillLastName(lastName)
        this.fillPostalCode(postalCode)
    }

    clickContinue() {
        this.continueButton.click()
    }

    clickCancel() {
        this.cancelButton.click()
    }

    // ═══════════════════════════════════════════════
    // ACTIONS - Step 2: Overview
    // ═══════════════════════════════════════════════
    clickFinish() {
        this.finishButton.click()
    }

    // ═══════════════════════════════════════════════
    // ACTIONS - Step 3: Complete
    // ═══════════════════════════════════════════════
    clickBackHome() {
        this.backHomeButton.click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS - Step 1
    // ═══════════════════════════════════════════════
    verifyCheckoutStepOnePage() {
        cy.url().should('include', '/checkout-step-one.html')
        this.pageTitle.should('contain.text', 'Checkout: Your Information')
    }

    verifyCheckoutInfoError() {
        this.errorMessage.should('be.visible')
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS - Step 2
    // ═══════════════════════════════════════════════
    verifyCheckoutStepTwoPage() {
        cy.url().should('include', '/checkout-step-two.html')
        this.pageTitle.should('contain.text', 'Checkout: Overview')
    }

    verifyProductInOverview(productName) {
        this.cartItemName.should('contain.text', productName)
    }

    verifySummaryTotal() {
        this.summaryTotal.should('be.visible')
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS - Step 3
    // ═══════════════════════════════════════════════
    verifyCheckoutComplete() {
        cy.url().should('include', '/checkout-complete.html')
        this.completeHeader.should('contain.text', 'Thank you for your order!')
    }

    verifyBackToInventory() {
        cy.url().should('include', '/inventory.html')
    }
}

export default CheckoutPage
