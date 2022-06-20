import Layout from "../../layouts"
import {useState} from "react"
import {useRouter} from "next/router";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    return (
        <Layout>
            <section>
                <Link href="/signUp/createUser"><a>グループがある方</a></Link>
            </section>
            <section>
            <Link href="/signUp/createGroup"><a>グループがない方</a></Link>
            </section>
        </Layout>
    )
}