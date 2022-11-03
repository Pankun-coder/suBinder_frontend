import { TestEnvironment } from "jest-environment-jsdom";
import { isEmailValid, isPasswordValid } from "lib/userHelper";

test("isEmailValid returns true if given valid email", () => {
  const result = isEmailValid("ex.ample@email.com");
  expect(result).toBe(true);
});

test("isEmailValid returns false if given invalid email", () => {
  const results = [
    isEmailValid("ex..ample@email.com"),
    isEmailValid(".example@mail.com"),
    isEmailValid("example@com"),
    isEmailValid("example.mail.com"),
  ];
  for (const index in results) {
    expect(results[index]).toBe(false);
  }
});

test("isPasswordValid returns true if given valid password", () => {
  const result = isPasswordValid("aaa111");
  expect(result).toBe(true);
});

test("isPasswordValid returns false if given invalid password", () => {
  const results = [isPasswordValid("abcdef"), isPasswordValid("123456"), isPasswordValid("aaa11")];
  for (const index in results) {
    expect(results[index]).toBe(false);
  }
});
