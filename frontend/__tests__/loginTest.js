import Login from "../pages/login";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"
import axios from "axios";

beforeEach(() => {
    render(<Login />);
})

it("should not allow email with two dots in a row", () => {
    const password = screen.getByPlaceholderText("パスワード");
    const email = screen.getByPlaceholderText("メールアドレス");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    act(() => {
        fireEvent.change(password, { target: { value: "aaa111aaa" } });
        fireEvent.change(email, { target: { value: "aaa..aaa@aaa.aaa" } });  
        submitButton.click();
    });

    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("メールアドレスが不正です");
})
it("should not allow password without a number", () => {
    const password = screen.getByPlaceholderText("パスワード");
    const email = screen.getByPlaceholderText("メールアドレス");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    act(() => {
        fireEvent.change(password, { target: { value: "aaaaaa" } });
        fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });  
        submitButton.click();
    });

    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("パスワードは数字とアルファベットを含んだ6文字以上でなければなりません");
})
it("should not allow password without a alphabet", () => {
    const password = screen.getByPlaceholderText("パスワード");
    const email = screen.getByPlaceholderText("メールアドレス");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    act(() => {
        fireEvent.change(password, { target: { value: "111111" } });
        fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });  
        submitButton.click();
    });

    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("パスワードは数字とアルファベットを含んだ6文字以上でなければなりません");
})
it("should not allow short password", () => {
    const password = screen.getByPlaceholderText("パスワード");
    const email = screen.getByPlaceholderText("メールアドレス");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    act(() => {
        fireEvent.change(password, { target: { value: "11aa" } });
        fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });  
        submitButton.click();
    });

    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("パスワードは数字とアルファベットを含んだ6文字以上でなければなりません");
})
it("should handle error from backend ", async () => {
    const password = screen.getByPlaceholderText("パスワード");
    const email = screen.getByPlaceholderText("メールアドレス");
    const submitButton = screen.getByRole("button", { name: "ログイン" });
    const postMock = jest.spyOn(axios, "post").mockName("axios-post");
    postMock.mockRejectedValue({ response: { data: { message: "パスワードまたはメールアドレスが正しくありません" } } })
    await act(() => {
        fireEvent.change(password, { target: { value: "aaa111" } });
        fireEvent.change(email, { target: { value: "aaa@aaa.aaa" } });  
        submitButton.click();
    });
    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("パスワードまたはメールアドレスが正しくありません");
})

