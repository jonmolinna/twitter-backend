export const validateRegister = (name, username, password, confirmPassword) => {
    const errors = {};

    if (name.trim() === '') {
        errors.name = 'Ingrese un nombre';
    }
    else if (name.length <= 2) {
        errors.name = 'Campo nombre debe tener mas de 2 caracteres';
    }
    else {
        const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!name.match(nameRegex)) {
            errors.name = 'Campo nombre solo acepta letras y espacios';
        }
    }

    if (username.trim() === '') {
        errors.username = 'Ingrese un usuario';
    }
    else if (username.length <= 4) {
        errors.username = 'Campo usuario debe tener mas de 4 caracteres';
    }
    else {
        const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
        if (!username.match(usernameRegex)) {
            errors.username = `${username} no es un usuario válido`;
        }
    }

    if (password === '') {
        errors.password = 'Ingrese una contraseña';
    }
    else if (password !== confirmPassword) {
        errors.password = 'Las contraseñas no coinciden'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
};

export const validateLogin = (username, password) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Ingrese un usuario';
    }

    if (password.trim() === '') {
        errors.password = 'Ingrese una constraseña';
    }

    return  {
        errors,
        valid: Object.keys(errors).length < 1,
    }
};