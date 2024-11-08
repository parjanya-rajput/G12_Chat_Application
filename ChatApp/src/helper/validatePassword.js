export const validatePassword = (password) => {
    return password.length === 0 || password.length >= 8;
};