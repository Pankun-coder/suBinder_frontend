import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import CreateUser from "../pages/signUp/createUser";

beforeEach(() => {
    render(<CreateUser />);
})

it("should not allow if groupId is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow if groupPassword is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow if userName is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow if email is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow if userPassword is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow if userPasswordConfirmation is left blank", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "未入力の項目があります" });
    expect(message).toBeInTheDocument();
})
it("should not allow email with two dots in a row", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "ma..il@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "メールアドレスが不正です" });
    expect(message).toBeInTheDocument();
})
it("should not allow password without a number", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abcdef" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abcdef" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません" });
    expect(message).toBeInTheDocument();
})
it("should not allow password without a alphabet", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "123456" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "123456" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません" });
    expect(message).toBeInTheDocument();
})
it("should not allow too short password", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc12" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc12" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません" });
    expect(message).toBeInTheDocument();
})
it("should not allow if userPassword and confirmation are not identical", () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    act(() => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc124" }});
        button.click();
    })
    const message = screen.getByRole("heading", { name: "パスワードと確認が一致しません" });
    expect(message).toBeInTheDocument();
})
it("should handle error from server side", async () => {
    const groupId = screen.getByPlaceholderText("グループID");
    const groupPassword = screen.getByPlaceholderText("グループのパスワード");
    const userName = screen.getByPlaceholderText("ユーザー名");
    const email = screen.getByPlaceholderText("メールアドレス");
    const userPassword = screen.getByPlaceholderText("ユーザーのパスワード");
    const userPasswordConfirmation = screen.getByPlaceholderText("パスワードの確認");
    const button = screen.getByRole("button", { "name": "ユーザーを作成する" });
    const postMock = jest.spyOn(axios, "post").mockName("axios-post");
    postMock.mockRejectedValue({ response: { data: { message: "error from server"}}});
    await act(async () => {
        fireEvent.change(groupId, { target: { value: "0" }});
        fireEvent.change(groupPassword, { target: { value: "abc123" }});
        fireEvent.change(userName, { target: { value: "太郎" }});
        fireEvent.change(email, { target: { value: "mail@mail.com" }});
        fireEvent.change(userPassword, { target: { value: "abc123" }});
        fireEvent.change(userPasswordConfirmation, { target: { value: "abc123" }});
        await button.click();
    })
    const message = await screen.findByRole("heading", { name: "error from server" });
    expect(message).toBeInTheDocument();
})
