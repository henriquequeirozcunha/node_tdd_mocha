const Loki = require('lokijs')

class TodoRepository {
    constructor() {
        const db = new Loki('todo', {})
        this.schedule = db.addCollection('schedule')
    }

    list() {
        return this.schedule.find()
    }
}

module.exports = TodoRepository