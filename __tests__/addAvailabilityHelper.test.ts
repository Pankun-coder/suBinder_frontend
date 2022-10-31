import { isDateValid, isTimeValid } from "lib/addAvailabilityHelper";

test("isDateValid returns true if given valid date", () => {
  const result = isDateValid(2020, 2, 29);
  expect(result).toBe(true);
});

test("isDateValid returns false if given invalid date", () => {
  const result = isDateValid(2022, 2, 29);
  expect(result).toBe(false);
});

test("isTimeValid returns true if given valid time", () => {
  const result = isTimeValid(20, 40);
  expect(result).toBe(true);
});

test("isTimeValid returns false if given invalid time", () => {
  const result = isTimeValid(20, -1);
  expect(result).toBe(false);
});
