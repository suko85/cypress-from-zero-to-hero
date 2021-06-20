export class SmartTablePage{

    updateAgeByFirstName(name, age){
            cy.get('tbody').contains('tr', name).then( tableRow => { // looking for the Larry's row and adding the tableRow parameter with all the row. 
            //clicking the pencil for Edit
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age) //accessing to the column by the index.
        })
    }

    addNewRecordWithFirstAndLastName(firstName, lastName){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="ID"]').type('99')
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('[placeholder="Username"]').type('abondar')
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('abondar@test.com')
            cy.wrap(tableRow).find('[placeholder="Age"]').type('36')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        //Assert each value inputed
        cy.get('tbody tr').first().find('td').then( tableColumn =>{
            cy.wrap(tableColumn).eq(1).should('contain', '99')
            cy.wrap(tableColumn).eq(2).should('contain', firstName)
            cy.wrap(tableColumn).eq(3).should('contain', lastName)
            cy.wrap(tableColumn).eq(4).should('contain', 'abondar')
            cy.wrap(tableColumn).eq(5).should('contain', 'abondar@test.com')
            cy.wrap(tableColumn).eq(6).should('contain', '36')
        })
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() =>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
        
    }
     
}

export const onSmartTablePage = new SmartTablePage()