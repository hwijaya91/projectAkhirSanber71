describe('quiz 3 - kerjakan test case tugas hari 7 tapi harus pass semua', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('SANBER-1 : Login dengan username benar dan password benar', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })
  it('SANBER-2 : Login dengan username salah dan password salah', () => {
    cy.get('input[placeholder="Username"]').type('member')
    cy.get('input[placeholder="Password"]').type('member123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('exist')
    cy.get('div[role="alert"]').should('have.text','Invalid credentials')
  })
  it('SANBER-3 : Login dengan username benar dan password salah', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('salah')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('exist')
    cy.get('div[role="alert"]').should('have.text','Invalid credentials')
  })
  it('SANBER-4 : Login dengan username salah dan password benar', () => {
    cy.get('input[placeholder="Username"]').type('member')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('exist')
    cy.get('div[role="alert"]').should('have.text','Invalid credentials')
  })
  it('SANBER-5 : Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('exist')
    cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').eq(0).should('have.text','Required')
    cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').eq(1).should('have.text','Required')
  })
  it('SANBER-6 : Fitur forgot password', () => {
    cy.contains('Forgot your password?').click()
    cy.get('input[placeholder="Username"]').type('contohusername')
    cy.get('button[type="submit"]').click()
    cy.get('.orangehrm-card-container').should('exist')
    cy.get('[class="oxd-text oxd-text--p"]').first().should('have.text','A reset password link has been sent to you via email.')
  })
  it('SANBER-7 : Fitur search di navbar', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('input[placeholder="Search"]').type('admin')
    cy.get('ul[class="oxd-main-menu"]').find('li').should('have.length', 1)
    cy.get('ul[class="oxd-main-menu"]').find('li').eq(0).should('have.text', 'Admin')
  })
  it('SANBER-8 : Ganti profile picture', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('My Info').click()
    cy.get('.employee-image').click()
    cy.get('input[type="file"]').selectFile('cypress/fixtures/istockphoto-1342129959-170667a.jpg', { force: true });
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-toast.oxd-toast--success.oxd-toast-container--toast').should('exist')
  })
  it('SANBER-9 : Ganti employee full name', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('My Info').click()
    cy.get('input[placeholder="First Name"]').clear().type('Naruto')
    cy.get('input[placeholder="Last Name"]').clear().type('Uzumaki')
    cy.get('[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').first().click()
    cy.reload()
    cy.get('.oxd-text.oxd-text--h6.--strong').should('have.text','Naruto Uzumaki')
  })
  it('SANBER-10 : Logout', () => {
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()
    cy.wait(1500)
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('be.visible')
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text','Login')
  })


})//tutup describe