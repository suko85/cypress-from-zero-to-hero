import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () =>{
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
      navigateTo.formLayoutsPage()
      navigateTo.datePickerPage()
      navigateTo.smartTablePage()
      navigateTo.tooltipPage()
      navigateTo.toasterPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Suko', 'suko@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('suko@test.com', 'password')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem', '40')
        onSmartTablePage.deleteRowByIndex(1)
    })

})