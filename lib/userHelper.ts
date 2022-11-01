export const isEmailValid = (email: string): boolean => {
  const validEmail = /^[a-zA-Z\d](\.?[\w-])*@[\w-]+\.[\w]+$/;
  return validEmail.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  const containNum = /[\d]+/;
  const containAlphabet = /[a-zA-Z]+/;
  return containNum.test(password) && containAlphabet.test(password) && password.length > 5;
};
