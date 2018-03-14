let errors = { todo: [], priority: []};

export const validateTodo = (todo) => {
    errors.todo = [];
    if (todo === '' || todo === undefined) {
        errors.todo.push('todo field is required!')
    }
    return errors;
}

export const validatePriority = (priority) => {
    errors.priority = [];
    if (priority === '' || priority === undefined || priority === null) {
        errors.priority.push('priority field is required!')
    }
    return errors;
}