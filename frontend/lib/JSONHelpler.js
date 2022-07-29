export const toCamelCase = (aJSON) => {
  let text = JSON.stringify(aJSON);
  const regExp = new RegExp(/_[a-zA-Z\d]/, "g");
  const result = text.replaceAll(regExp, (text) => text[1].toUpperCase());
  return JSON.parse(result);
};

export const toSnakeCase = (aJSON) => {
  const text = JSON.stringify(aJSON);
  const regExp = new RegExp(/[a-z][A-Z][a-z]/, "g");
  const result = text.replaceAll(regExp, (text) => text[0] + "_" + text[1].toLowerCase() + text[2]);
  return JSON.parse(result);
};
