/// <reference types ="cypress" />
import Do from '../support/doClass.js'
import navTo from '../support/navTo.js'

describe('Tugas Akhir - Bagian Login', () => {

  beforeEach(() => {
    Do.visit()
  })

  it('FINALSANBER-1 : Login dengan username benar dan password benar', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('home')
    cy.reload()
    cy.wait('@home').its('response.statusCode').should('eq', 200)
    cy.login('admin','admin123')
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })
  it('FINALSANBER-2 : Login dengan username salah dan password salah', () => {
    cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('log')
    cy.login('member','member123')
    cy.wait('@log').its('response.statusCode').should('eq', 302)
    Do.assertMsgInvalid()
  })
  it('FINALSANBER-3 : Fitur forgot password', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('forgot')
    Do.forgotPass('contohusername')
    cy.wait('@forgot').its('response.statusCode').should('eq', 200)
    cy.get('.orangehrm-card-container').should('exist')
    cy.get('[class="oxd-text oxd-text--p"]').first().should('have.text','A reset password link has been sent to you via email.')
  })
  it('FINALSANBER-4 : Logout', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout').as('out')
    cy.login('admin','admin123')
    cy.wait(1500)
    Do.logOut()
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('be.visible')
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text','Login')
    cy.wait('@out').its('response.statusCode').should('eq', 302)
  })
})

describe('Tugas Akhir - Bagian Dashboard', () => {

  beforeEach(() => {
    cy.session('logSes', () => {
      Do.visit()
      cy.login('admin','admin123')
    })
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })

  it('FINALSANBER-5 : Fitur search di navbar', () => {
    Do.menuSearchAssertion('Admin')
    Do.menuSearchAssertion('Dashboard')
    Do.menuSearchAssertion('Directory')
  })
  it('FINALSANBER-6 : Validate card menu on dashboard', () => {
    cy.get('.orangehrm-dashboard-widget .oxd-text--p').eq(0).should('have.text','Time at Work')
    cy.get('.orangehrm-dashboard-widget .oxd-text--p').eq(1).should('have.text','My Actions')
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
    .should('have.text','Quick Launch')
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
    .should('have.text','Buzz Latest Posts')
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
    .should('have.text','Employees on Leave Today')
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
    .should('have.text','Employee Distribution by Sub Unit')
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
    .should('have.text','Employee Distribution by Location')
    
  })
  it('FINALSANBER-7 : Assign Leave from dashboard', () => {
    
    cy.get('div.orangehrm-quick-launch-card').find('[title="Assign Leave"]').first().click()
    cy.get('input[placeholder="Type for hints..."]').type('abc  539133')
    cy.wait(600)
    cy.get('div[role="listbox"]').contains('abc 539133').click()
    cy.get('.oxd-select-text-input').click()
    cy.get('div[role="listbox"]').contains('CAN - FMLA').click()
    cy.get('.oxd-date-input').eq(0).type('2025-18-4')
    cy.get('.oxd-date-input').eq(1).clear()
    cy.get('.oxd-date-input').eq(1).type('2025-19-4')
    cy.get('button').contains('Assign').click()
    cy.get('.oxd-dialog-sheet--gutters').contains('Ok').click()
    cy.get('.oxd-text--toast-title').should('have.text', 'Success')
    cy.get('.oxd-text--toast-message').should('have.text', 'Successfully Saved')
  })
  
})//tutup describe

describe('Tugas Akhir - Bagian Directory', () => {

  beforeEach(() => {
    cy.session('logSes', () => {
      Do.visit()
      cy.login('admin','admin123')
    })
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })

  it('FINALSANBER-8 : Validasi UI menu Directory', () => {
    navTo.directory()
    cy.get('.oxd-text.oxd-text--h5.oxd-table-filter-title').should('have.text','Directory')
    cy.get('label').eq(0).should('be.visible')
    cy.get('label').eq(1).should('be.visible')
    cy.get('label').eq(2).should('be.visible')
    cy.get('label').eq(0).should('have.text','Employee Name')
    cy.get('label').eq(1).should('have.text','Job Title')
    cy.get('label').eq(2).should('have.text','Location')
    //tutup modal directory
    cy.get('button.oxd-icon-button').eq(2).click()
    cy.get('label').eq(0).should('not.be.visible')
    cy.get('label').eq(1).should('not.be.visible')
    cy.get('label').eq(2).should('not.be.visible')

    cy.get('span[class="oxd-text oxd-text--span"]').should('contain','Records Found')
    
  })
  it('FINALSANBER-9 : Fitur search and reset by Employee Name', () => {
    navTo.directory()

    cy.get('[placeholder="Type for hints..."]').type('abc')
    cy.wait(600)
    cy.get('div[role="listbox"]').contains('abc').click()
    cy.get('button[type="reset"]').click()
    cy.get('[placeholder="Type for hints..."]').should('be.empty')

    cy.get('[placeholder="Type for hints..."]').type('Rebecca')
    cy.wait(600)
    cy.get('div[role="listbox"]').contains('Rebecca').click()
    cy.contains('Search').click()

    cy.get('p.orangehrm-directory-card-header').first().should('contain','Rebecca')

  })
  it.only('FINALSANBER-10 : Fitur search and reset by Job Title', () => {
    navTo.directory()
  })
  it('FINALSANBER-11 : Fitur search and reset by Location', () => {
    navTo.directory()
  })
  it('FINALSANBER-12 : Fitur search and reset mixed', () => {
    navTo.directory()
  })
})//tutup describe