let errors = { username: [], password: [], email: [] };

export const validateUsername = (username) => {
    errors.username = [];
    if (username === '' || username === undefined) {
        errors.username.push('username field is required!')
    }
    return errors;
}

export const validatePassword = (password) => {
    errors.password = [];
    if (password === '' || password === undefined) {
        errors.password.push('password field is required!')
    }
    return errors;
}

export const validateEmail = (email) => {
    errors.email = [];
    if (email === '' || email === undefined) {
        errors.email.push('email field is required!')
    }
    return errors;
}