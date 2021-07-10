Cypress.Commands.add('insertIngredient', ({ cantidad, unidad, ingrediente }) => {
    if (cantidad) {
        cy.get('[placeholder=cantidad]').type(cantidad)
    }
    if (unidad) {
        cy.get('[placeholder=unidad]').type(unidad)
    }
    if (ingrediente) {
        cy.get('[placeholder=ingrediente]').type(ingrediente)
    }
    cy.get('button.MuiButtonBase-root').eq(1).click()
})
