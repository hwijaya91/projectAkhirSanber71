/// <reference types ="cypress" />
import Do from '../support/doClass.js'

describe('tugas 16 - penambahan intercept', () => {

  beforeEach(() => {
    Do.visit()
  })

  it('SANBER-1 : Login dengan username benar dan password benar', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('home')
    cy.reload()
    cy.wait('@home').its('response.statusCode').should('eq', 200)
    cy.login('admin','admin123')
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })
  it('SANBER-2 : Login dengan username salah dan password salah', () => {
    cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('log')
    cy.login('member','member123')
    cy.wait('@log').its('response.statusCode').should('eq', 302)
    Do.assertMsgInvalid()
  })
  it('SANBER-3 : Login dengan username benar dan password salah', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('msg')
    cy.login('admin','salah')
    cy.wait('@msg').its('response.statusCode').should('eq', 304)
    Do.assertMsgInvalid()
  })
  it('SANBER-4 : Login dengan username salah dan password benar', () => {
    cy.login('member','admin123')
    Do.assertMsgInvalid()
  })
  it('SANBER-5 : Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click()
    const notif = cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
    notif.should('exist')
    notif.eq(1).should('have.text','Required')
    notif.eq(0).should('have.text','Required')
  })
  it('SANBER-6 : Fitur forgot password', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('forgot')
    Do.forgotPass('contohusername')
    cy.wait('@forgot').its('response.statusCode').should('eq', 200)
    cy.get('.orangehrm-card-container').should('exist')
    cy.get('[class="oxd-text oxd-text--p"]').first().should('have.text','A reset password link has been sent to you via email.')
  })
  it('SANBER-7 : Fitur search di navbar', () => {
    cy.login('admin','admin123')
    cy.get('input[placeholder="Search"]').type('admin')
    cy.get('ul[class="oxd-main-menu"]').find('li').should('have.length', 1)
    cy.get('ul[class="oxd-main-menu"]').find('li').eq(0).should('have.text', 'Admin')
  })
  it('SANBER-8 : Ganti profile picture', () => {
    cy.intercept('PUT','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7/picture').as('pict')
    cy.login('admin','admin123')
    Do.gantiPp('cypress/fixtures/istockphoto-1342129959-170667a.jpg')
    cy.wait('@pict').its('response.statusCode').should('eq', 200)
    cy.get('.oxd-toast.oxd-toast--success.oxd-toast-container--toast').should('exist')
  })
  it('SANBER-9 : Ganti employee full name', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees').as('emplo')
    cy.login('admin','admin123')
    Do.gantiNama('Naruto','Uzumaki')
    cy.wait('@emplo').its('response.statusCode').should('eq', 200)
    cy.reload()
    cy.get('.oxd-text.oxd-text--h6.--strong').should('have.text','Naruto Uzumaki')
  })
  it('SANBER-10 : Logout', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout').as('out')
    cy.login('admin','admin123')
    cy.wait(1500)
    Do.logOut()
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('be.visible')
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text','Login')
    cy.wait('@out').its('response.statusCode').should('eq', 302)
  })


})//tutup describe