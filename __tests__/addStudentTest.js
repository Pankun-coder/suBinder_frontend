import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import AddStudent from "pages/addStudent";
import { isLoggedInContext } from "lib/isLoggedInContext";

beforeEach(() => {
  render(
    <isLoggedInContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: null }}>
      <AddStudent />
    </isLoggedInContext.Provider>,
  );
});

it("should validate absence of student name", async () => {
  const studentNameInput = screen.getByPlaceholderText("生徒名");
  const submitButton = screen.getByRole("button", { name: "生徒登録" });
  await act(async () => {
    submitButton.click();
  });

  const message = screen.getByText("入力が必要な項目です");
  expect(message).toBeInTheDocument();
});

it("should show message from backend", async () => {
  const studentNameInput = screen.getByPlaceholderText("生徒名");
  const submitButton = screen.getByRole("button", { name: "生徒登録" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockReturnValue(Promise.resolve({ data: { message: "message from backend" } }));
  await act(async () => {
    fireEvent.change(studentNameInput, { target: { value: "wayne jones" } });
    submitButton.click();
  });

  const message = await screen.findByRole("heading", { name: "message from backend" });
  expect(message).toBeInTheDocument();
});
