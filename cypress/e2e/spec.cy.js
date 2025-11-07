/// <reference types ="cypress" />
import Do from '../support/doClass.js'
import navTo from '../support/navTo.js'
import directory from '../support/directory.js'
import leave from '../support/leave.js'

describe('Tugas Akhir - Bagian Login', () => {

  beforeEach(() => {
    Do.loginPage()
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
      Do.loginPage()
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
    const todaysDate = Do.today()
    const api = `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-balance/leave-type/7?fromDate=${todaysDate[1]}&toDate=${todaysDate[1]}&empNumber=11&duration[type]=full_day`
    cy.intercept('GET',api).as('leave')
    cy.get('div.orangehrm-quick-launch-card').find('[title="Assign Leave"]').first().click()
    leave.name('rebecca')
    leave.type('CAN - FMLA')
    leave.date(todaysDate[0])
    cy.get('button').contains('Assign').click()
    cy.wait('@leave').its('response.statusCode').should('eq', 200)
    cy.get('.oxd-dialog-sheet--gutters').contains('Ok').click()
    cy.get('.oxd-text--toast-title').should('have.text', 'Success')
    cy.get('.oxd-text--toast-message').should('have.text', 'Successfully Saved')
  })
  
})//tutup describe

describe('Tugas Akhir - Bagian Directory', () => {

  beforeEach(() => {
    cy.session('logSes', () => {
      Do.loginPage()
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
    cy.get('button.oxd-icon-button').eq(2).click()
    cy.get('label').eq(0).should('not.be.visible')
    cy.get('label').eq(1).should('not.be.visible')
    cy.get('label').eq(2).should('not.be.visible')
    cy.get('span[class="oxd-text oxd-text--span"]').should('contain','Records Found')
  })
  it('FINALSANBER-9 : Fitur search and reset by Employee Name', () => {
    navTo.directory()
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=rebecc').as('employeeName')
    directory.employeeName('rebecc')
    cy.wait('@employeeName').its('response.statusCode').should('eq',200)
    directory.reset()
    cy.get('[placeholder="Type for hints..."]').should('be.empty')
    directory.employeeName('rebecc')
    directory.search()
    cy.get('p.orangehrm-directory-card-header').should('contain','Rebecca')
  })
  it('FINALSANBER-10 : Fitur search and reset by Job Title', () => {
    navTo.directory()
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('reset')
    directory.job('QA Engineer')
    cy.get('div.oxd-select-text-input').first().should('have.text','QA Engineer')
    directory.reset()
    cy.wait('@reset').its('response.statusCode').should('eq',200)
    cy.get('div.oxd-select-text-input').first().should('have.text','-- Select --')
    directory.job('QA Engineer')
    cy.wait(600)
    directory.search()
    cy.get('p.orangehrm-directory-card-subtitle').should('contain','QA Engineer')

  })
  it('FINALSANBER-11 : Fitur search and reset by Location', () => {
    navTo.directory()
    directory.location('Texas')
    cy.get('div.oxd-select-text-input').eq(1).should('have.text','Texas R&D')
    directory.reset()
    cy.get('div.oxd-select-text-input').eq(1).should('have.text','-- Select --')
    directory.location('Texas')
    cy.wait(600)
    directory.search()
    cy.get('p.orangehrm-directory-card-description').should('contain','Texas')
  })
  context('FINALSANBER-12 : Fitur search and reset mixed', () => {
    it('FINALSANBER-12-1 : Fitur search and reset employee and job', () => {
      navTo.directory()
      directory.employeeName('rebecc')
      directory.job('QA Engineer')
      directory.search()
      cy.get('p.orangehrm-directory-card-header').should('contain','Rebecca')
    })
    it('FINALSANBER-12-2 : Fitur search and reset employee and location', () => {
      navTo.directory()
      directory.reset()
      directory.employeeName('rebecc')
      directory.location('Texas')
      directory.search()
      cy.get('p.orangehrm-directory-card-header').should('contain','Rebecca')
    })
    it('FINALSANBER-12-3 : Fitur search and reset job and location', () => {
      navTo.directory()
      directory.reset()
      directory.job('QA Engineer')
      directory.location('Texas')
      directory.search()
      cy.get('p.orangehrm-directory-card-header').should('contain','Rebecca')
    })
    it('FINALSANBER-12-4 : Fitur search semua kosong', () => {
      navTo.directory()
      directory.reset()
      directory.search()
      cy.wait(1000)
      cy.get('span[class="oxd-text oxd-text--span"]').invoke('text').then((actualTextValue) => {
        const match = actualTextValue.match(/\((\d+)\)/)
        if (match && match[1]) {
          const count = parseInt(match[1], 10)
          expect(count).to.be.a('number');
          expect(count).to.be.greaterThan(0)
          expect(actualTextValue).to.include('Records Found')
        }
      })
      
    })
  })//tutup context

})//tutup describe