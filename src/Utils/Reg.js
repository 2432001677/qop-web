const email = /^[a-zA-Z0-9_-]{1,20}@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+){1,10}$/;
const phoneNumber = /^\d{5,40}$/;
const emailReg = (s) => email.test(s);
const phoneNumberReg = (s) => phoneNumber.test(s);
export { emailReg, phoneNumberReg };
