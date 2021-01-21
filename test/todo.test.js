const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const Todo = require('../src/todo')

const makeFakeData = () => ({
    text: 'any_text',
    when: new Date('2020-12-01')
})

// const makeSut = () => {
//     const sut = new Todo(makeFakeData())
//     return {
//         sut
//     }
// }
// const { sut } = makeSut()
// const result = sut.isValid()

describe('todo', () => {
    describe('#isValid', () => {
        it('should return invalid when creating an object with no text', () => {
            const data = {
                text: '',
                when: new Date('2020-12-01')
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok
        })
        it('should return invalid when creating an object with "when" property with invalid data', () => {
            const data = {
                text: 'any_text',
                when: new Date('20-12-01')
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok
        })
    })
    
})
