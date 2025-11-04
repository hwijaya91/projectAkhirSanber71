class Do{
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    assertMsgInvalid(){
        cy.get('div[role="alert"]').should('exist')
        cy.get('div[role="alert"]').should('have.text','Invalid credentials')
    }
    forgotPass(username){
        cy.contains('Forgot your password?').click()
        cy.get('input[placeholder="Username"]').type(username)
        cy.get('button[type="submit"]').click()
    }
    gantiPp(filepath){
        cy.contains('My Info').click()
        cy.get('.employee-image').click()
        cy.get('input[type="file"]').selectFile(filepath, { force: true });
        cy.get('button[type="submit"]').click()
    }
    gantiNama(firstname,lastname){
        cy.contains('My Info').click()
        cy.get('input[placeholder="First Name"]').clear().type(firstname)
        cy.get('input[placeholder="Last Name"]').clear().type(lastname)
        cy.get('[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').first().click()
    }
    logOut(){
        cy.get('.oxd-userdropdown-tab').click()
        cy.contains('Logout').click()
    }
}

export default new Do()