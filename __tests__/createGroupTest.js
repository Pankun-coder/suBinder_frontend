import "@testing-library/jest-dom";
import { render, screen, fireEvent, findByText } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import CreateGroup from "pages/signUp/createGroup";

beforeEach(() => {
  render(<CreateGroup />);
});
it("should not allow if groupName is left blank", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "abcdef" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abcdef" } });
    button.click();
  });
  const message = screen.getByRole("heading", { name: "未入力の項目があります" });
  expect(message).toBeInTheDocument();
});
it("should not allow if password is left blank", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abcdef" } });
    button.click();
  });
  const message = screen.getByRole("heading", { name: "未入力の項目があります" });
  expect(message).toBeInTheDocument();
});
it("should not allow if password confirmation is left blank", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abcdef" } });
    fireEvent.change(passwordConfirmation, { target: { value: "" } });
    button.click();
  });
  const message = screen.getByRole("heading", { name: "未入力の項目があります" });
  expect(message).toBeInTheDocument();
});
it("should not allow password without a number", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abcdef" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abcdef" } });
    button.click();
  });
  const message = screen.getByRole("heading", {
    name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
  });
  expect(message).toBeInTheDocument();
});
it("should not allow password without a alphabet", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "123456" } });
    fireEvent.change(passwordConfirmation, { target: { value: "123456" } });
    button.click();
  });
  const message = screen.getByRole("heading", {
    name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
  });
  expect(message).toBeInTheDocument();
});
it("should not allow too short password", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abc12" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abc12" } });
    button.click();
  });
  const message = screen.getByRole("heading", {
    name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
  });
  expect(message).toBeInTheDocument();
});
it("should not allow if password and confirmation are not identical", () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  act(() => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abc123" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abc124" } });
    button.click();
  });
  const message = screen.getByRole("heading", { name: "パスワードと確認が一致しません" });
  expect(message).toBeInTheDocument();
});
it("should not allow if password and confirmation are not identical", async () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockRejectedValue({ response: { data: { message: "error from server" } } });
  await act(async () => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abc123" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abc123" } });
    await button.click();
  });
  const message = await screen.findByRole("heading", { name: "error from server" });
  expect(message).toBeInTheDocument();
});
it("should show sucess modal", async () => {
  const groupName = screen.getByPlaceholderText("グループ名");
  const password = screen.getByPlaceholderText("グループのパスワード");
  const passwordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "グループを作成する" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockResolvedValue({ data: { message: "error from server", group_id: 1 } });
  await act(async () => {
    fireEvent.change(groupName, { target: { value: "教室" } });
    fireEvent.change(password, { target: { value: "abc123" } });
    fireEvent.change(passwordConfirmation, { target: { value: "abc123" } });
    await button.click();
  });
  const message = await screen.findByRole("heading", { name: "グループが作られました!" });
  expect(message).toBeInTheDocument();
});
