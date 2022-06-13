import Link from "next/link"

export default function Layout({children}) {
    return (
        <>
        <header>
            <h1>e-C4rte</h1>
            <nav>
                <ul>
                    <li><Link href="/"><a>home</a></Link></li>
                    <li><Link href="/signUp"><a>会員登録</a></Link></li>
                </ul>
            </nav>
        </header>
        {children}
        </>
    )
}
