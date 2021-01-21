const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoRepository = require('../src/todo-repository')

const mockFakeTodo = () => ([
    {
        name: 'HenriqueCunha',
        age: 90,
        meta: { revision: 0, created: 1111111111, version: 0 },
        '$loki': 1
    }
]);

describe('TodoRepository', () => {
    let todoRepository
    let sandBox
    before(() => {
        sandBox = new createSandbox()
        todoRepository = new TodoRepository()
    })
    afterEach(() => {
        sandBox.restore()
    })

    describe('Method Signature', () => {
        it('Should call find from lokiJs', () => {
            sandBox.stub(todoRepository.schedule, 'find').returns(mockFakeTodo())
            const result = todoRepository.list()
            expect(result).to.be.deep.equal(mockFakeTodo())
        })
    })
    
})

