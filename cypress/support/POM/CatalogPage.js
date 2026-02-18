/**
 * =====================================================
 * PAGE OBJECT MODEL - CATALOG PAGE
 * Website: https://sauce-demo.myshopify.com/collections/all
 * =====================================================
 */

class CatalogPage {

    // ═══════════════════════════════════════════════
    // ELEMENTS
    // ═══════════════════════════════════════════════
    get pageTitle() {
        return cy.get('h1')
    }

    // ═══════════════════════════════════════════════
    // ACTIONS
    // ═══════════════════════════════════════════════
    visit() {
        cy.visit('/collections/all')
        cy.url().should('include', '/collections/all')
    }

    selectProduct(productName) {
        cy.contains(productName).click()
    }

    // ═══════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════
    verifyCatalogPage() {
        this.pageTitle.should('contain.text', 'Products')
    }
}

export default CatalogPage
