import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import AddAvailability from "pages/addAvailability";
import { isLoggedInContext } from "lib/isLoggedInContext";

beforeEach(() => {
  render(
    <isLoggedInContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: null }}>
      <AddAvailability />
    </isLoggedInContext.Provider>,
  );
});

it("should not if fromTime is left blank", async () => {
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");
  const numberOfAvailability = screen.getByLabelText("人分");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });
  await act(async () => {
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not if toTime is left blank", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");
  const numberOfAvailability = screen.getByLabelText("人分");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });

  await act(async () => {
    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not if fromDate is left blank", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const toDate = screen.getByLabelText("まで");
  const numberOfAvailability = screen.getByLabelText("人分");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });

  await act(async () => {
    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not if toDate is left blank", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  await act(async () => {
    const numberOfAvailability = screen.getByLabelText("人分");
    const submitButton = screen.getByRole("button", { name: "予約枠を作る" });

    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});
it("should not if number of availability is left blank", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });
  await act(async () => {
    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    submitButton.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not if number of availability is more than 100", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");

  await act(async () => {
    const numberOfAvailability = screen.getByLabelText("人分");
    const submitButton = screen.getByRole("button", { name: "予約枠を作る" });

    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 101 } });
    submitButton.click();
  });
  const message = screen.getByText("一度に作れるのは100人分までです");
});

it("should handle message from backend", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");
  const numberOfAvailability = screen.getByLabelText("人分");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockReturnValue(Promise.resolve({ data: { message: "message from backend" } }));

  await act(async () => {
    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = await screen.findByRole("heading", { name: "message from backend" });
  expect(message).toBeInTheDocument;
});

it("should handle error from backend", async () => {
  const fromTime = screen.getByLabelText("開始時刻:");
  const toTime = screen.getByLabelText("終了時刻:");
  const fromDate = screen.getByLabelText("から");
  const toDate = screen.getByLabelText("まで");
  const numberOfAvailability = screen.getByLabelText("人分");
  const submitButton = screen.getByRole("button", { name: "予約枠を作る" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockReturnValue(
    Promise.reject({ response: { data: { message: "error from backend" } } }),
  );

  await act(async () => {
    fireEvent.change(fromTime, { target: { value: "12:00" } });
    fireEvent.change(toTime, { target: { value: "13:00" } });
    fireEvent.change(fromDate, { target: { value: "2010-08-01" } });
    fireEvent.change(toDate, { target: { value: "2010-08-31" } });
    fireEvent.change(numberOfAvailability, { target: { value: 1 } });
    submitButton.click();
  });
  const message = await screen.findByRole("heading", { name: "error from backend" });
  expect(message).toBeInTheDocument;
});
