class leave{
    name(name){
        cy.get('input[placeholder="Type for hints..."]').type(name)
        cy.wait(800)
        cy.get('div[role="listbox"]').contains(name,{matchCase:false}).click()
        
    }
    type(type){
        cy.get('.oxd-select-text-input').click()
        cy.get('div[role="listbox"]').contains(type).click()
    }
    date(date){
        cy.get('.oxd-date-input').eq(0).type(date)
        cy.get('.oxd-date-input').eq(1).clear()
        cy.get('.oxd-date-input').eq(1).type(date)
    }
}

export default new leave()