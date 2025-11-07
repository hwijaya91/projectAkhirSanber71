class directory{
    employeeName(name){
        cy.get('[placeholder="Type for hints..."]').type(name)
        cy.wait(600)
        cy.get('div[role="listbox"]').contains(name,{matchCase:false}).click()
    }
    job(job){
        cy.get('.oxd-select-text--active').first().click()
        cy.contains(job,{matchCase:false}).click()
    }
    location(loc){
        cy.get('.oxd-select-text--active').eq(1).click()
        cy.contains(loc).click()
    }
    search(){
        cy.contains('Search').click()
    }
    reset(){
        cy.get('button[type="reset"]').click()
    }
    
}

export default new directory()