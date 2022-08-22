import Login from "../pages/login";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";

beforeEach(() => {
  render(<Login />);
});

it("should not allow if email is left blank", async () => {
  const password = screen.getByPlaceholderText("パスワード");
  const email = screen.getByPlaceholderText("メールアドレス");
  const submitButton = screen.getByRole("button", { name: "ログイン" });

  await act(async () => {
    fireEvent.change(password, { target: { value: "aaa111aaa" } });
    fireEvent.change(email, { target: { value: "" } });
    submitButton.click();
  });

  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});
it("should not allow password without a number", async () => {
  const password = screen.getByPlaceholderText("パスワード");
  const email = screen.getByPlaceholderText("メールアドレス");
  const submitButton = screen.getByRole("button", { name: "ログイン" });

  await act(async () => {
    fireEvent.change(password, { target: { value: "aaaaaa" } });
    fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });
    submitButton.click();
  });

  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});
it("should not allow password without a alphabet", async () => {
  const password = screen.getByPlaceholderText("パスワード");
  const email = screen.getByPlaceholderText("メールアドレス");
  const submitButton = screen.getByRole("button", { name: "ログイン" });

  await act(async () => {
    fireEvent.change(password, { target: { value: "111111" } });
    fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });
    submitButton.click();
  });

  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});
it("should not allow short password", async () => {
  const password = screen.getByPlaceholderText("パスワード");
  const email = screen.getByPlaceholderText("メールアドレス");
  const submitButton = screen.getByRole("button", { name: "ログイン" });

  await act(async () => {
    fireEvent.change(password, { target: { value: "11aa" } });
    fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });
    submitButton.click();
  });

  const message = screen.getByText("パスワードは6文字以上にしてください");
  expect(message).toBeInTheDocument();
});
it("should handle error from backend ", async () => {
  const password = screen.getByPlaceholderText("パスワード");
  const email = screen.getByPlaceholderText("メールアドレス");
  const submitButton = screen.getByRole("button", { name: "ログイン" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockRejectedValue({
    response: { data: { message: "パスワードまたはメールアドレスが正しくありません" } },
  });
  await act(async () => {
    fireEvent.change(password, { target: { value: "aaa111" } });
    fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });
    submitButton.click();
  });

  const message = await screen.findByRole("heading", {
    name: "パスワードまたはメールアドレスが正しくありません",
  });
  expect(message).toBeInTheDocument();
});
