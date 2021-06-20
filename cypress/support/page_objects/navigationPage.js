
//Verifying if the passed Feature in the menu is collapsed or not.
function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu => {
        //locating the second 'g' tag into expand-state.
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')){
               cy.wrap(menu).click() 
            }
        })
    })
}

export class NavigationPage{

    formLayoutsPage(){ 
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){        
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click() 
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}
//this constructor create an instance of this class and assign it to the object (NavigationPage)
//so you can call the methods of this class using the 'navigateTo' object.
export const navigateTo = new NavigationPage()