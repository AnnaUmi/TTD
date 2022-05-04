const isEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

export const checkIsEmail = (str) => str.match(isEmailPattern) ? true : false;

const isPasswordValidPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

export const checkIsPassportValid = (str) => str.match(isPasswordValidPattern) ? true : false;

export const checkIsEqualStrings = (str1, str2) => str1 === str2 ? true : false;

export const ERRORS_MESSAGE = {
    email: "Please input correct email",
    password: "Please input correct password, must have at least one capital letter, one numeric character, and onespecial character",
    passwordConfirmation:  "Passwords don't match",
}
export const NOTIFICATION_MESSAGE = {
    success: "You form successfully submitted"
}