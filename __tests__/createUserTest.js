import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import CreateUser from "pages/signUp/createUser";
import { createMockRouter } from "lib/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

it("should not allow if groupId is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow if groupPassword is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow groupPassword without a number", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abcdef" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow groupPassword without a alphabet", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "123456" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow too short groupPassword", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc12" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードは6文字以上にしてください");
  expect(message).toBeInTheDocument();
});

it("should not allow if userName is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow if userEmail is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow if userPassword is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow userPassword without a number", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abcdef" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow userPassword without a alphabet", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "123456" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow too short userPassword", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc12" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    button.click();
  });
  const message = screen.getByText("パスワードは6文字以上にしてください");
  expect(message).toBeInTheDocument();
});

it("should not allow if userPasswordConfirmation is left blank", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "" } });
    button.click();
  });
  const message = screen.getByText("入力が必須の項目です");
  expect(message).toBeInTheDocument();
});

it("should not allow userPasswordConfirmation without a number", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abcdef" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow userPasswordConfirmation without a alphabet", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "123456" } });
    button.click();
  });
  const message = screen.getByText("パスワードにはアルファベットと数字を含めてください");
  expect(message).toBeInTheDocument();
});

it("should not allow too short userPasswordConfirmation", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "1" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc12" } });
    button.click();
  });
  const message = screen.getByText("パスワードは6文字以上にしてください");
  expect(message).toBeInTheDocument();
});

it("should handle error from server side", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  const groupPassword = screen.getByPlaceholderText("グループのパスワード");
  const userName = screen.getByPlaceholderText("ユーザー名");
  const email = screen.getByPlaceholderText("メールアドレス");
  const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
  const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
  const button = screen.getByRole("button", { name: "ユーザーを作成する" });
  const postMock = jest.spyOn(axios, "post").mockName("axios-post");
  postMock.mockRejectedValue({ response: { data: { message: "error from server" } } });
  await act(async () => {
    fireEvent.change(groupId, { target: { value: "0" } });
    fireEvent.change(groupPassword, { target: { value: "abc123" } });
    fireEvent.change(userName, { target: { value: "太郎" } });
    fireEvent.change(email, { target: { value: "mail@mail.com" } });
    fireEvent.change(userPassword, { target: { value: "abc123" } });
    fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" } });
    await button.click();
  });
  const message = await screen.findByRole("heading", { name: "error from server" });
  expect(message).toBeInTheDocument();
});

it("should fill groupID if given in query", async () => {
  render(
    <RouterContext.Provider value={createMockRouter({ query: { groupId: 1 } })}>
      <CreateUser />;
    </RouterContext.Provider>,
  );
  const groupId = screen.getByPlaceholderText("グループID");
  expect(groupId.value).toBe("1");
});
