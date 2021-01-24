class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository
    }

    create(todoItem) {
        let validationError = {
            error: {
                message: 'invalid data',
                data: todoItem
            }
        }
        if(!todoItem.isValid()) {
            return validationError
        }

        const { when } = todoItem

        const today = new Date()
        const todo = {
            ...todoItem,
            status: when > today ? 'pending' : 'late'
        }
        
        return !!this.todoRepository.create(todo)
    }
    list() {
        return this.todoRepository.list()
        .map(({ meta, $loki, ...result }) => result)
    }
}

module.exports = TodoService