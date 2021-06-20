/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON object', () => {
        cy.openHomePage()

        //simple object (in brackets)
        const simpleObject = {"key": "value", "key2": "value2"}

        //simple array (always in square braces)
        const simpleArrayOfValues = ["one", "two", "three"]

        //array of objects (here we have 3 objects in one array)
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]

        //what kind of data can be in the JSON object is a string or number
        const typesOfData = {"string": "this is a string", "number": 10}

        const mix = {
            "FirstName": "Artem",
            "LastName": "Bondar",
            "Age": 35,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Connor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[2].key3)
        console.log(mix.Students[1].lastName)

        const lastNameOfSecondStudent = mix.Students[1].lastName

    })

})