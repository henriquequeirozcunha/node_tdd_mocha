const { describe, it, before, beforeEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoService = require('../src/todo-service')
const Todo = require('../src/todo')

const makeFakeTodoList = () => ([
    {
      name: 'HenriqueCunha',
      age: 90,
      meta: { revision: 0, created: 1111111111, version: 0 },
      $loki: 1,
    }
])


const makeFakeTodoItem = () => (
    {
      name: 'HenriqueCunha',
      age: 90,
      meta: { revision: 0, created: 1111111111, version: 0 },
      $loki: 1,
    }
)

const makeTodoRepositoryStub = () => {
  class TodoRepositoryStub {
    list() {
      return makeFakeTodoList()
    }
  }
  return new TodoRepositoryStub()
};

const makeSut = () => {
  const todoRepositoryStub = makeTodoRepositoryStub()
  const sut = new TodoService({ todoRepository: todoRepositoryStub })
  return {
    sut,
    todoRepositoryStub,
  };
};

describe('TodoService', () => {
  let sandBox
  before(() => {
    sandBox = new createSandbox()
  });
  afterEach(() => {
    sandBox.restore()
  })
  describe('#List', () => {
    let sut
    beforeEach(() => {
        const todoRepositoryStub = {
            list: sandBox.stub().returns(makeFakeTodoList())
        }
        sut = new TodoService({ todoRepository: todoRepositoryStub })
    })
    it('Should return data on a specific format - Curso Mango Format', () => {
      const { sut } = makeSut()
      const result = sut.list()
      const [{ meta, $loki, ...rest }] = makeFakeTodoList()
      expect(result).to.be.deep.equal([rest])
    })
    it('Should return data on a specific format', () => {
        const result = sut.list()
        const [{ meta, $loki, ...rest }] = makeFakeTodoList()
        expect(result).to.be.deep.equal([rest])
    })
  })
  describe('#Create', () => {
    let sut
    beforeEach(() => {
        const todoRepositoryStub = {
            create: sandBox.stub().returns(makeFakeTodoItem())
        }
        sut = new TodoService({ todoRepository: todoRepositoryStub })
    })
    it('Should return a validationError(data) when validation fails', () => {
        const todoItem = new Todo({
            text: '',
            when: ''
        })
        Reflect.deleteProperty(todoItem, 'id')
        const validationError = {
            error: {
                message: 'invalid data',
                data: todoItem
            }
        }
        const result = sut.create(todoItem)
        expect(result).to.be.deep.equal(validationError)

    })
    it('Should return true on created todoItem success', () => {
        const todoItem = new Todo({
            text: 'any_text',
            when: new Date()
        })
        const result = sut.create(todoItem)
        expect(result).to.be.deep.equal(true)
    })
    it('Should return an object with late status if when property is before current date', () => {
      const expectedId = '000001'
      const uuid = require('uuid')
      const fakeUUID = sandBox.fake.returns(expectedId)
      sandBox.replace(uuid, 'v4', fakeUUID)

      const todoItem = new Todo({
            text: 'any_value',
            when: new Date('2020-12-01 12:00:00 GMT-0')
        })
      
      const todayTestDate = new Date('2020-12-02')
      sandBox.useFakeTimers(todayTestDate.getTime())

      sut.create(todoItem)

      const expectedResult = {
        ...todoItem,
        status: 'late'
      }

      console.log(expectedResult)

      expect(sut.todoRepository.create.calledOnceWithExactly(expectedResult)).to.be.ok
    })
    it('Should save item with pending status', () => {
      const expectedId = '000001'
      const uuid = require('uuid')
      const fakeUUID = sandBox.fake.returns(expectedId)
      sandBox.replace(uuid, 'v4', fakeUUID)

      const todoItem = new Todo({
            text: 'any_value',
            when: new Date('2020-12-01 12:00:00 GMT-0')
        })
      
      const todayTestDate = new Date('2020-11-30')
      sandBox.useFakeTimers(todayTestDate.getTime())

      sut.create(todoItem)

      const expectedResult = {
        ...todoItem,
        status: 'pending'
      }

      console.log(expectedResult)

      expect(sut.todoRepository.create.calledOnceWithExactly(expectedResult)).to.be.ok
  })
  })
})
