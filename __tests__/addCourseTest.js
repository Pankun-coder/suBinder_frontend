import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import AddCourse from "pages/addCourse";
import { isLoggedInContext } from "lib/isLoggedInContext";

beforeEach(() => {
  render(
    <isLoggedInContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: null }}>
      <AddCourse />
    </isLoggedInContext.Provider>,
  );
});

it("should not allow if course name is left blank", async () => {
  const courseName = screen.getByPlaceholderText("教材名");
  const submitButton = screen.getByRole("button", { name: "教材を追加する" });
  await act(async () => {
    fireEvent.change(courseName, { target: { value: "" } });
    submitButton.click();
  });
  console.log(courseName);
  const message = screen.getByRole("heading", { name: "教材名を入力してください" });
  expect(message).toBeInTheDocument();
});

it("should handle message from backend", async () => {
  const courseName = screen.getByPlaceholderText("教材名");
  const submitButton = screen.getByRole("button", { name: "教材を追加する" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockReturnValue(Promise.resolve({ data: { message: "message from backend" } }));

  await act(async () => {
    fireEvent.change(courseName, { target: { value: "example course name" } });
    submitButton.click();
  });
  const message = screen.getByRole("heading", { name: "message from backend" });
  expect(message).toBeInTheDocument;
});

it("should handle error from backend", async () => {
  const courseName = screen.getByPlaceholderText("教材名");
  const submitButton = screen.getByRole("button", { name: "教材を追加する" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockReturnValue(
    Promise.reject({ response: { data: { message: "error from backend" } } }),
  );

  await act(async () => {
    fireEvent.change(courseName, { target: { value: "example course name" } });
    submitButton.click();
  });
  const message = screen.getByRole("heading", { name: "error from backend" });
  expect(message).toBeInTheDocument;
});
