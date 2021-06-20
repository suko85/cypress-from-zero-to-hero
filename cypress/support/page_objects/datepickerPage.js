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
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()               
            }
        }) 
        return dateAssert
       }

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){    
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click() 
            let dateAssert = selectDayFromCurrent(dayFromToday) // calling the function at the top
            //Asserts to check that the required day is displayed in the input
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })        
    }

    selectDatepickerWithRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click() 
            let dateAssertFirst = selectDayFromCurrent(firstDay) // calling the function at the top
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst+' - '+dateAssertSecond
            //Asserts to check that the required day is displayed in the input
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })       
    }


}

export const onDatePickerPage = new DatepickerPage()