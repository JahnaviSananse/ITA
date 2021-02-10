export const isValidEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
        return true;
    }
    return false;
};

export const isBlank = (text) => {
    if (text.trim() === '') {
        return true;
    }
    return false;
};


export const isValidPassword = (password, length) => {
    if (password.length >= length) {
        return true;
    }
    return false;
};

export const isValidComparedPassword = (password, confirmPassword) => {
    if (password == confirmPassword) {
        return true;
    }
    return false;
};