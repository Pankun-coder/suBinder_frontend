export const isEmailValid = (email) => {
  const validEmail = /^[a-zA-Z\d](\.?[\w-])*@[\w-]+\.[\w]+$/;
  return validEmail.test(email);
};

export const isPasswordValid = (password) => {
  const containNum = /[\d]+/;
  const containAlphabet = /[a-zA-Z]+/;
  return containNum.test(password) && containAlphabet.test(password) && password.length > 5;
};
