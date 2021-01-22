const { describe, it, before, beforeEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoService = require('../src/todo-service')

const makeFakeTodo = () => ([
    {
      name: 'HenriqueCunha',
      age: 90,
      meta: { revision: 0, created: 1111111111, version: 0 },
      $loki: 1,
    }
])

const makeTodoRepositoryStub = () => {
  class TodoRepositoryStub {
    list() {
      return makeFakeTodo()
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
  describe('#List', () => {
    let sut
    beforeEach(() => {
        const todoRepositoryStub = {
            list: sandBox.stub().returns(makeFakeTodo())
        }
        sut = new TodoService({ todoRepository: todoRepositoryStub })
    })


    it('Should return data on a specific format - Curso Mango Format', () => {
      const { sut } = makeSut()
      const result = sut.list()
      const [{ meta, $loki, ...rest }] = makeFakeTodo()
      expect(result).to.be.deep.equal([rest])
    })
    it('Should return data on a specific format', () => {
        const result = sut.list()
        const [{ meta, $loki, ...rest }] = makeFakeTodo()
        expect(result).to.be.deep.equal([rest])
    })
  })
})
