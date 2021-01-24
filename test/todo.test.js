const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const Todo = require('../src/todo')
const { createSandbox } = require('sinon')

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
    let sandBox
    before(() => {
        sandBox = new createSandbox()
    });
    afterEach(() => {
        sandBox.restore()
    })
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
        it('should have "id", "text", "when" and "status" on success', () => {
            const expectedId = '000001'
            const uuid = require('uuid')
            const fakeUUID = sandBox.fake.returns(expectedId)
            sandBox.replace(uuid, 'v4', fakeUUID)
            
            const todo = new Todo(makeFakeData())
            const result = todo.isValid()
            expect(result).to.be.ok
            expect(uuid.v4.calledOnce).to.be.ok

            const expectedResult = {
                ...todo,
                status: '',
                id: expectedId
            }
            expect(todo).to.be.deep.equal(expectedResult)
        })
    })
    
})
