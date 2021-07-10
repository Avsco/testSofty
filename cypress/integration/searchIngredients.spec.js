describe('Comecon App', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('Test Case 22', () => {
        it('Verify that the text in the search bar have matches', () => {
            const serachWord = 'que'
            cy.get('input.MuiInputBase-input').type(serachWord)
            cy.wait(2000)
            cy.get('ul.MuiAutocomplete-listbox > li').should(($lis) => {
                expect($lis.eq(0).text()).to.match(RegExp(serachWord))
            })
        })
    })
})
