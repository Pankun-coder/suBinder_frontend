import Link from "next/link"
export default function LoginRequiredModal() {
    return (
        <section className="fixed top-0 left-0 w-full h-full bg-black/30">
            <div className="left-0 right-0 top-0 bottom-0 w-1/2 h-1/2 absolute m-auto align-middle bg-gray-100 opacity-100 border-2 border-black shadow-2xl">
                <h1>ログインが必要なページです</h1>
                <Link href="/login"><a>ログインページへ</a></Link>
            </div>
        </section>
    )
}