/**
 * =====================================================
 * PAGE OBJECT MODEL - CATALOG PAGE (INVENTORY)
 * Website: https://www.saucedemo.com/inventory.html
 * =====================================================
 */

class CatalogPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get pageTitle() {
        return cy.get('.title')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
    }

    selectProduct(productName) {
        cy.contains('.inventory_item_name', productName).click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyCatalogPage() {
        this.pageTitle.should('contain.text', 'Products')
    }
}

export default CatalogPage
