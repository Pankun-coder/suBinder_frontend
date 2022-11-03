import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  hasReservationBy,
  areAllReserved,
  isReservedBy,
  isAvailable,
} from "lib/calendarHelper";

test("getFirstDayOfMonth gets the day correctly", () => {
  const result = getFirstDayOfMonth(new Date(2022, 9, 28));
  expect(result.getFullYear()).toBe(2022);
  expect(result.getMonth()).toBe(9);
  expect(result.getDate()).toBe(1);
});

test("getLastDayOfMonth gets the day correctly", () => {
  const result = getLastDayOfMonth(new Date(2022, 9, 28));
  expect(result.getFullYear()).toBe(2022);
  expect(result.getMonth()).toBe(9);
  expect(result.getDate()).toBe(31);
});

test("hasReservationBy returns true if given array and student ID of whom has reservation there", () => {
  const arrayOfAvailabilities = [
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 1,
      reservedBy: { id: null, name: null },
    },
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 2,
      reservedBy: { id: 10, name: "stuent" },
    },
  ];
  const studentId = 10;
  const result = hasReservationBy(studentId, arrayOfAvailabilities);
  expect(result).toBe(true);
});

test("hasReservationBy returns false if given array and student ID of whom does not has reservation there", () => {
  const arrayOfAvailabilities = [
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 1,
      reservedBy: { id: null, name: null },
    },
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 2,
      reservedBy: { id: 10, name: "stuent" },
    },
  ];
  const studentId = 11;
  const result = hasReservationBy(studentId, arrayOfAvailabilities);
  expect(result).toBe(false);
});

test("areAllReserved returns true if none of the availabilities in the given array is available", () => {
  const arrayOfAvailabilities = [
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 1,
      reservedBy: { id: 2, name: "customer" },
    },
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 2,
      reservedBy: { id: 10, name: "stuent" },
    },
  ];
  const result = areAllReserved(arrayOfAvailabilities);
  expect(result).toBe(true);
});

test("areAllReserved returns false if some of the availabilities in the given array is available", () => {
  const arrayOfAvailabilities = [
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 1,
      reservedBy: { id: null, name: null },
    },
    {
      from: "2022-1-31T09:00:00.000+09:00",
      to: "2022-1-31T10:00:00.000+09:00",
      id: 2,
      reservedBy: { id: 10, name: "stuent" },
    },
  ];
  const result = areAllReserved(arrayOfAvailabilities);
  expect(result).toBe(false);
});

test("isReservedBy returns true if given pair of student ID and availability reserved by the student", () => {
  const availability = {
    from: "2022-1-31T09:00:00.000+09:00",
    to: "2022-1-31T10:00:00.000+09:00",
    id: 1,
    reservedBy: { id: 5, name: "student" },
  };
  const studentId = 5;
  const result = isReservedBy(studentId, availability);
  expect(result).toBe(true);
});

test("isReservedBy returns false if given student ID and availability whose reserver is not the student", () => {
  const availability = {
    from: "2022-1-31T09:00:00.000+09:00",
    to: "2022-1-31T10:00:00.000+09:00",
    id: 1,
    reservedBy: { id: 5, name: "student" },
  };
  const studentId = 10;
  const result = isReservedBy(studentId, availability);
  expect(result).toBe(false);
});

test("isAvailable returns true if given availability not reserved", () => {
  const availability = {
    from: "2022-1-31T09:00:00.000+09:00",
    to: "2022-1-31T10:00:00.000+09:00",
    id: 1,
    reservedBy: { id: null, name: null },
  };
  const result = isAvailable(availability);
  expect(result).toBe(true);
});

test("isAvailable returns false if given availability already reserved", () => {
  const availability = {
    from: "2022-1-31T09:00:00.000+09:00",
    to: "2022-1-31T10:00:00.000+09:00",
    id: 1,
    reservedBy: { id: 5, name: "student" },
  };
  const result = isAvailable(availability);
  expect(result).toBe(false);
});
