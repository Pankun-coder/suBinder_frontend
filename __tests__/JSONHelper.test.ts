import { toCamelCase, toSnakeCase } from "lib/JSONHelpler";

test("toSnakeCase translates camelCased JSON into snake_cased one", () => {
  const camelCased = { aKey: "aValue", anotherKey: "anotherValue" };
  const result = toSnakeCase(camelCased);
  const snakeCased = { a_key: "a_value", another_key: "another_value" };
  expect(result).toMatchObject(snakeCased);
});

test("toCamelCase translates snake_cased JSON into camelCased one", () => {
  const snakeCased = { a_key: "a_value", another_key: "another_value" };
  const result = toCamelCase(snakeCased);
  const camelCased = { aKey: "aValue", anotherKey: "anotherValue" };
  expect(result).toMatchObject(camelCased);
});
