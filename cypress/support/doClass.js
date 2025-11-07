import navTo from "./navTo"

class Do{
    loginPage(){
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
    logOut(){
        cy.get('.oxd-userdropdown-tab').click()
        cy.contains('Logout').click()
    }
    menuSearchAssertion(menu){
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').type(menu)
        cy.get('ul[class="oxd-main-menu"]').find('li').should('have.length', 1)
        cy.get('ul[class="oxd-main-menu"]').find('li').eq(0).should('have.text', menu)
    }
    today(){
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        // const formattedDate = `${year}-${day}-${month}`
        // const leaveDateAPI = `${year}-${month}-${day}`
        const formattedDate = '2023-06-06'
        const leaveDateAPI = '2023-06-06'
        const date = [formattedDate,leaveDateAPI]
        return date
    }
}

export default new Do()