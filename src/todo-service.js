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
        
        return !!this.todoRepository.create(todoItem)
    }
    list() {
        return this.todoRepository.list()
        .map(({ meta, $loki, ...result }) => result)
    }
}

module.exports = TodoService