/// <reference types="cypress" />

/**
 * =====================================================
 * BASIC CYPRESS SELECTORS & ACTIONS
 * Website: https://sauce-demo.myshopify.com/
 * =====================================================
 * Actions yang dipelajari:
 *   1. cy.visit()    → Membuka halaman
 *   2. cy.get()      → Mengambil element
 *   3. .type()       → Mengetik teks
 *   4. .click()      → Klik element
 *   5. .should()     → Assertions / validasi
 *   6. cy.wait()     → Menunggu (ms)
 * =====================================================
 */

describe('Basic Selector & Actions - Sauce Demo', () => {

  // ═══════════════════════════════════════════════
  // 1. VISIT PAGE (cy.visit)
  // ═══════════════════════════════════════════════
  describe('1. Visit Page', () => {
    it('should visit the homepage', () => {
      cy.visit('https://sauce-demo.myshopify.com/')
      cy.url().should('include', 'sauce-demo')
    })

    it('should visit the login page', () => {
      cy.visit('https://sauce-demo.myshopify.com/account/login')
      cy.url().should('include', '/account/login')
    })

    it('should visit the catalog page', () => {
      cy.visit('https://sauce-demo.myshopify.com/collections/all')
      cy.url().should('include', '/collections/all')
    })
  })

  // ═══════════════════════════════════════════════
  // 2. CY.GET (Mengambil Element)
  // ═══════════════════════════════════════════════
  describe('2. cy.get - Mengambil Element', () => {
    beforeEach(() => {
      cy.visit('https://sauce-demo.myshopify.com/account/login')
    })

    it('get element by ID → #customer_email', () => {
      cy.get('#customer_email').should('exist')
    })

    it('get element by Class → .container.upper (Header)', () => {
      cy.get('.container.upper').should('be.visible')
    })

    it('get element by Tag → h1', () => {
      cy.get('h1').should('exist')
    })

    it('get element by Attribute → input[type="password"]', () => {
      cy.get('input[type="password"]').should('exist')
    })

    it('get element by Combined selector → form#customer_login', () => {
      cy.get('form#customer_login').should('exist')
    })

    it('get element by Text → cy.contains()', () => {
      cy.contains('Customer Login').should('be.visible')
    })
  })

  // ═══════════════════════════════════════════════
  // 3. TYPE TEXT (.type)
  // ═══════════════════════════════════════════════
  describe('3. Type Text - Mengetik di Input Field', () => {
    beforeEach(() => {
      cy.visit('https://sauce-demo.myshopify.com/account/login')
    })

    it('should type email into email field', () => {
      cy.get('#customer_email')
        .type('testuser@example.com')
        .should('have.value', 'testuser@example.com')
    })

    it('should type password into password field', () => {
      cy.get('#customer_password')
        .type('MyPassword123')
        .should('have.value', 'MyPassword123')
    })

    it('should clear field and retype', () => {
      cy.get('#customer_email')
        .type('wrongemail@test.com')
        .clear()
        .type('correct@test.com')
        .should('have.value', 'correct@test.com')
    })
  })

  // ═══════════════════════════════════════════════
  // 4. CLICK (.click)
  // ═══════════════════════════════════════════════
  describe('4. Click - Klik Element', () => {
    it('should click on a navigation link (Catalog)', () => {
      cy.visit('https://sauce-demo.myshopify.com/')
      cy.contains('Catalog').click()
      cy.url().should('include', '/collections/all')
    })

    it('should click on a product to go to detail page', () => {
      cy.visit('https://sauce-demo.myshopify.com/collections/all')
      cy.contains('Grey jacket').click()
      cy.url().should('include', '/products/grey-jacket')
    })

    it('should click the Login link from homepage', () => {
      cy.visit('https://sauce-demo.myshopify.com/')
      cy.contains('Log In').click()
      cy.url().should('include', '/account/login')
    })
  })

  // ═══════════════════════════════════════════════
  // 5. ASSERTIONS (.should)
  // ═══════════════════════════════════════════════
  describe('5. Assertions - Validasi Element', () => {
    beforeEach(() => {
      cy.visit('https://sauce-demo.myshopify.com/')
    })

    it('should verify element EXISTS', () => {
      cy.get('.container.upper').should('exist')
    })

    it('should verify element IS VISIBLE', () => {
      cy.get('.container.upper').should('be.visible')
    })

    it('should verify element HAS ATTRIBUTE', () => {
      cy.get('a[href="/cart"]').should('have.attr', 'href', '/cart')
    })

    it('should verify element count (HAVE LENGTH)', () => {
      cy.get('a').should('have.length.greaterThan', 5)
    })

    it('should verify page TITLE', () => {
      cy.title().should('contain', 'Sauce Demo')
    })

    it('should verify URL contains specific path', () => {
      cy.url().should('include', 'sauce-demo.myshopify.com')
    })
  })

  // ═══════════════════════════════════════════════
  // 6. WAIT (cy.wait)
  // ═══════════════════════════════════════════════
  describe('6. Wait - Menunggu', () => {
    it('should wait 2 seconds before checking the page', () => {
      cy.visit('https://sauce-demo.myshopify.com/')
      cy.wait(2000) // Tunggu 2 detik
      cy.get('.container.upper').should('be.visible')
    })

    it('should wait between actions', () => {
      cy.visit('https://sauce-demo.myshopify.com/account/login')
      cy.get('#customer_email').type('test@example.com')
      cy.wait(1000) // Tunggu 1 detik
      cy.get('#customer_password').type('password123')
      cy.wait(1000) // Tunggu 1 detik
      cy.get('#customer_email').should('have.value', 'test@example.com')
      cy.get('#customer_password').should('have.value', 'password123')
    })

    it('should wait after clicking a link', () => {
      cy.visit('https://sauce-demo.myshopify.com/')
      cy.contains('a', 'Catalog').click()
      cy.wait(2000) // Tunggu halaman selesai load
      cy.url().should('include', '/collections/all')
      cy.get('h1').should('contain.text', 'Products')
    })
  })

})