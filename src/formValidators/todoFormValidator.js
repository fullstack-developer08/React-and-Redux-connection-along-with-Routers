let errors = { description: [], priority: []};

export const validateTodo = (description) => {
    errors.description = [];
    if (description === '' || description === undefined) {
        errors.description.push('todo field is required!')
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