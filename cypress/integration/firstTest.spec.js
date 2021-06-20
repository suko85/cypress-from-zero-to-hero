/// <reference types= "cypress"/>

//const { clear } = require("console")

//const { find } = require("cypress/types/lodash")

describe('Our first suite', () => {

    it('first test', () => {

        cy.visit('/')  // <-- here we are providing the path of our application. It is the baseUrl in cypress.json file
        cy.contains('Forms').click()  //<-- we are providing the plain Text of the element in the DOM.
        cy.contains('Form Layouts').click() //<-- we are providing the plain Text of the element in the DOM.

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by Tag name Attribute with value, ID and Class Name
        cy.get('input[type="email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })
    //when we want to run a test only, we use the 'only' method, after it.
    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //here we added this attribute and value to the tag and could find by it.
        cy.get('[data-cy="sigInBtn"]')

        // here we search for webelement with this attribute and text Sign in.
        cy.contains('[status="warning"]', 'Sign in') // Hey Cypress! Locate for me the Web element with a locator attribute name is "status" and value "warning" which contains  the "Sign in" text.

        // here we want to select an element with several matches, so we select the first unique id close it and moved to parent webelement and then found by desired tagName.  
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        //we are going to find a webelement without unique attribute.
        //So, we found by visible text and added the second parameter(parents tag).
        //"..Find the nb-card which contains text Horizontal form and 
        //within nb-card find webelement with attribute type="email".."
        cy.contains('nb-card', 'Horizontal form')
            .find('[type="email"]')
    })

    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        /*cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputPassword1"]')
            .should('contain', 'Password')*/

        //Selenium style doesn't work because Cypress is asynchronous:
        //so, you CAN NOT save the context or  the object of the result of the Cypress commands and returns value of the commands.
 
          // const firstForm = cy.contains('nb-card', 'Using the Grid')
          // const secondForm = cy.contains('nb-card', 'Basic form')
          // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
          // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //cypress style
          //here we got the result of this function and saved it into the this parameter (firstForm).
          //We use the result of this function(cy.contains('nb-card', 'Using the Grid'))as a parameter for our next function which is the one between brackets.  
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {//after 'then' function it become in JQuery object format. Inside brackets all is JQuery format.
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')
            
            cy.wrap(firstForm).should('contain', 'Password') //this come back to Cypress format

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond) //comparing the two Webelements text.

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })

        })

    })

    it('invoke command', () => {
        cy.visit('/') // it is reading the URL setted on cypress.json (baseUrl)
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //*****Remember two ways to assert texts*****
        //No.1
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        //No.2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        //No.3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        //to verify if checkbox is selected
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class') //invoke the specific attributte to check the value later.
            //.should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click() 

        cy.contains('nb-card', 'Common Datepicker')
            .find('input').then(input => {
               cy.wrap(input).click() 
               cy.get('nb-calendar-day-picker').contains('5').click()
               cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 5, 2021')
            })
    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 
        
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true}) //{force: true} disables all error checking waitinf fo actionability.
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)    //<-- getting by index the second radio button within radioButtons array.
                .check({force: true})  
            
            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')
            
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled') // checking that the checkbox is disable.
        })
    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click() 

        cy.get('[type="checkbox"]').check({force: true}) // it check (clicked) all checkboxes in the 'type="checkbox"' array
        cy.get('[type="checkbox"]').eq(0).click({force: true}) // uncheck first checkbox.

    }) 

    it('lists and dropdowns', () => {
        cy.visit('/')
        //1
        // cy.get('nav nb-select').click()
        // //clicking the themes picklist and selecting Dark.
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // //verifying theme color was changed localizing 'nb-layout-header nav' in the Styles tab. 
        // // Copy the value of background and convert it to rgb using google.
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)') 

        //2
        cy.get('nav nb-select').then( dropdown => { //saving the value of the menu in the dropdown variable 
            cy.wrap(dropdown).click() // clicking the menu.
            cy.get('.options-list nb-option').each( (listItem, index) =>{ //getting all values in the list by the nb-options tag. Then for each element saved on listItem...
                const itemText = listItem.text().trim()  // saving the text of each option in itemText const removing the white space at the beggining.
                //creating a JSON with all background colors of each item of the menu.
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                //verifying corresponding background color after click each item of the dropdwon.
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3){       //checking if the clicked item is not the last one in the menu
                    cy.wrap(dropdown).click()  //once the index will be equal to 3 this step will be skipped 
                }                    
            }) 

        })

    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //Scenario 1. Edit a value of an input.
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => { // looking for the Larry's row and adding the tableRow parameter with all the row. 
            //clicking the pencil for Edit
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25') //accessing to the column by the index.
        })

        //Scenario 2. Add a new row with personal data.
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="ID"]').type('99')
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('[placeholder="Username"]').type('abondar')
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('abondar@test.com')
            cy.wrap(tableRow).find('[placeholder="Age"]').type('36')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        //Assert each value inputed
        cy.get('tbody tr').first().find('td').then( tableColumn =>{
            cy.wrap(tableColumn).eq(1).should('contain', '99')
            cy.wrap(tableColumn).eq(2).should('contain', 'Artem')
            cy.wrap(tableColumn).eq(3).should('contain', 'Bondar')
            cy.wrap(tableColumn).eq(4).should('contain', 'abondar')
            cy.wrap(tableColumn).eq(5).should('contain', 'abondar@test.com')
            cy.wrap(tableColumn).eq(6).should('contain', '36')
        })

        //Scenario 3. Filtering the table by specific column and verifying.
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(800)
            cy.get('tbody tr').each( tableRow => { //iterating for each row after filter
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age) //verifying all values are Age in the last column
                }                
            }) 
        })
    })
    
     it('web datepickers', () => {

        function selectDayFromCurrent(day){
        //getting the current day, future day and future month after current day.
        let date = new Date()
        date.setDate(date.getDate() + day) //adding some 'day' to the current date. 
        let futureDay = date.getDate() //this is our future day after add some days.
        let futureMonth = date.toLocaleString('default', {month: 'short'}) //return short version of month like DEC, JAN, FEB.
        let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear() // getting the final date in the input after select it in the datepicker.
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute =>{ //getting the actual date selected by default in the datepicker
                if( !dateAttribute.includes(futureMonth)){ //if current date does not have the futureMonth (determinated by 'day' variable)
                    cy.get('[data-name="chevron-right"]').click()  //then click right button in Month selector.
                    selectDayFromCurrent(day)   //calling the function itself and restart on Line177.
                } else{
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()               
                }
            }) 
            return dateAssert
           }  
        //this is the Cypress Test      
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click() 

        cy.contains('nb-card', 'Common Datepicker')
            .find('input').then(input => {
               cy.wrap(input).click() 
               let dateAssert = selectDayFromCurrent(300) // calling the function above
               //Asserts to check that the required day is displayed in the input
               cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
               cy.wrap(input).should('have.value', dateAssert)
            })
    })

    it('tooltip' , () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click() 
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dialog box', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 (This way is note recommended because the alert window was not really checked)
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //2 (This is the best way)
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // //3 (This one cancel the dialog box, but continue asking to the user)
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => false)
    })
})

