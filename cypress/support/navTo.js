class navTo{
    admin(){
        cy.get('input[placeholder="Search"]').clear()
        cy.contains('Admin').click()
    }
    dashboard(){
        cy.get('input[placeholder="Search"]').clear()
        cy.contains('Dashboard').click()
    }
    directory(){
        cy.get('input[placeholder="Search"]').clear()
        cy.contains('Directory').click()
    }
    
}

export default new navTo()