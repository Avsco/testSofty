import 'cypress-file-upload'
const filePath = 'images'

const data = [
    { cantidad: 1, unidad: 'litro', ingrediente: 'leche' },
    { cantidad: 2, unidad: 'lojas', ingrediente: 'jamon' },
    { cantidad: 3, unidad: 'unidades', ingrediente: 'huevo' },
    { cantidad: 4, unidad: 'cucharas', ingrediente: 'azucar' },
    { cantidad: 5, unidad: 'pizcas', ingrediente: 'pimienta' },
    { cantidad: 6, unidad: 'cucharillas', ingrediente: 'sal' },
    { cantidad: 7, unidad: 'mililitros', ingrediente: 'vainilla' },
    { cantidad: 8, unidad: 'gramos', ingrediente: 'chocolate' },
    { cantidad: 9, unidad: 'kilos', ingrediente: 'harina' },
    { cantidad: 10, unidad: 'unidades', ingrediente: 'pan' },
    { cantidad: 11, unidad: 'miligramos', ingrediente: 'queso' },
    { cantidad: 12, unidad: 'tazas', ingrediente: 'arroz' },
    { cantidad: 13, unidad: 'litro', ingrediente: 'agua' },
    { cantidad: 14, unidad: 'unidades', ingrediente: 'pescado' },
    { cantidad: 15, unidad: 'prechugas', ingrediente: 'pollo' },
    { cantidad: 16, unidad: 'litro', ingrediente: 'aceite' },
    { cantidad: 17, unidad: 'unidades', ingrediente: 'tomate' },
    { cantidad: 18, unidad: 'hojas', ingrediente: 'lechuga' },
    { cantidad: 19, unidad: 'ramas', ingrediente: 'clavo de olor' },
    { cantidad: 20, unidad: 'dientes', ingrediente: 'ajo' },
    { cantidad: 21, unidad: 'unidades', ingrediente: 'manzana' },
]

describe('Comecon App', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Iniciar Sesion').click()
        cy.wait(1000)
        cy.get('[name=username]').type('admin@gmail.com')
        cy.get('[name=password]').type('123asdASD')
        cy.get('.auth0-lock-submit').click()
        cy.wait(1000)
        cy.contains('Registrar recetas').dblclick()
    })

    afterEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    describe('Test Case: 19', () => {
        it('Verify that images with a resolution lower than 480 px × 480 px are not accepted', () => {
            cy.get('[name=archivo]').attachFile(`${filePath}/small.jpg`)
            cy.on('window:alert', (txt) => {
                expect(txt).to.include('Las medidas deben ser: menor a 720x720 o mayor a 480x480')
            })
        })
    })

    describe('Test Case: 20', () => {
        it('Verify that images with a resolution greater than 720 px × 720 px are not accepted', () => {
            cy.get('[name=archivo]').attachFile(`${filePath}/big.jpg`)
            cy.on('window:alert', (txt) => {
                expect(txt).to.include('Las medidas deben ser: menor a 720x720 o mayor a 480x480')
            })
        })
    })

    describe('Test Case 35', () => {
        it('Verify that an ingredient is registered without "cantidad"', () => {
            cy.insertIngredient({ unidad: 'unidades', ingrediente: 'pares de patas' })
            cy.on('window:alert', (txt) => {
                expect(txt).to.include('las unidades deben ser numeros positivos')
            })
        })

        it('Verify that an ingredient is registered without "unidad"', () => {
            cy.insertIngredient({ cantidad: 3, ingrediente: 'pares de patas' })
            cy.on('window:alert', (txt) => {
                expect(txt).to.include(
                    'la unidad debe tener solo caracteres de la a la z y no debe estar vacia'
                )
            })
        })

        it('Verify that an ingredient is registered without "ingrediente"', () => {
            cy.insertIngredient({ cantidad: 3, unidad: 'unidades' })
            cy.on('window:alert', (txt) => {
                expect(txt).to.include(
                    'el nombre debe tener solo caracteres de la a la z y no debe estar vacia'
                )
            })
        })
    })

    describe('Test Case 86: ', () => {
        it('Verify that the ingredient limit is 20', () => {
            data.forEach(({ cantidad, unidad, ingrediente }) => {
                cy.insertIngredient({
                    cantidad,
                    unidad,
                    ingrediente,
                })
            })
            cy.get('table.MuiTable-root').find('tr').its('length').should('eq', 20)
        })
    })

    describe('Test Case: 100', () => {
        it('Verify all buttons on the page have the same format', () => {
            cy.insertIngredient(data[0])
            cy.get('button').should('have.class', 'MuiButtonBase-root', 'MuiButton-root')
        })
    })

    describe('Test Case: 103', () => {
        it('Verify can add ingredient into table', () => {
            cy.insertIngredient(data[0])

            cy.get('table.MuiTable-root').within(() => {
                cy.contains(data[0].cantidad)
                cy.contains(data[0].unidad)
                cy.contains(data[0].ingrediente)
            })
        })
    })

    describe('Test Case: 104', () => {
        it('Verify can remove ingredient into table', () => {
            cy.insertIngredient(data[0])

            cy.get('table.MuiTable-root > tbody').within(() => {
                cy.contains(data[0].cantidad)
                cy.contains(data[0].unidad)
                cy.contains(data[0].ingrediente)
            })

            cy.contains('eliminar').click()
            cy.get('table.MuiTable-root > tbody').children().should('have.length', 0)
        })
    })

    describe('Test Case: 107', () => {
        const recipe = {
            name: 'gelatina de colores',
            image: `${filePath}/gelatina.jpg`,
            ingredients: [
                { cantidad: 3, unidad: 'unidades', ingrediente: 'gelatinas' },
                { cantidad: 6, unidad: 'tazas', ingrediente: 'agua' }
            ],
            elaborationSteps:
                'En una olla grande vertir las 6 tazas de agua, encender la estufa y esperar a que hierva, luego poner las patas a la olla por unos 30 minutos, despues apagar el fuego, retirar los restos de las patas y vertir el saborizante, mezclar el contenido de la olla, esperar a que enfrie la olla y ponerlo en un refijerador por 5 horas, finalmente servir',
            complexity: 1,
            calories: 100,
            saturatedFats: 0,
            carbohydrates: 20,
        }

        it('Verify that the success message when registering a recipe says "receta registrada correctamente"', () => {
            cy.get('[name=camponombre]').type(recipe.name)
            cy.get('[name=archivo]').attachFile(recipe.image)
            recipe.ingredients.forEach((ingredient) => {
                cy.insertIngredient(ingredient)
            })
            cy.get('textarea').type(recipe.elaborationSteps)
            cy.get('[name=campocomplejidad]').type(recipe.complexity)
            cy.get('[name=campoCalorias]').type(recipe.calories)
            cy.get('[name=campoGrasas]').type(recipe.saturatedFats)
            cy.get('[name=campoCarbohidratos]').type(recipe.carbohydrates)
            cy.contains('Registrar Receta').click()

            cy.on('window:alert', (txt) => {
                expect(txt).to.include('receta registrada correctamente')
            })
        })
    })
})
