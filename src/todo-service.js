class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository
    }

    create(todoItem) {
        return !!this.todoRepository.create(todoItem)
    }
    list() {
        return this.todoRepository.list()
        .map(({ meta, $loki, ...result }) => result)
    }
}

module.exports = TodoService