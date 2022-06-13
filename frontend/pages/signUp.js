import Layout from "../layouts"
import {useState} from "react"

export default function SignUp() {
    const [value, setvalue] = useState(0);
    const sendInformation = () => {

    }
    return (
        <Layout>
            <section>
                グループがある方

            </section>
            <section>
                グループがない方
                <form>
                    <label for="groupName">グループ名</label>
                    <input id="groupName"></input>
                    <label for="password">パスワード</label>
                    <input id="password" type="password"></input>
                    <label for="passwordConfirmation">確認</label>
                    <input id="passwordConfirmation" type="password"></input>
                    <input type="button" value="submit"></input>
                </form>
            </section>
        </Layout>
    )
}