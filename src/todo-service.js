class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository
    }

    create(todoItem) {

    }
    list() {
        return this.todoRepository.list()
        .map(({ meta, $loki, ...result }) => result)
    }
}

module.exports = TodoService