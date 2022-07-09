import Link from "next/link"
import axios from "axios"
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Router, useRouter } from "next/router";

export default function Layout({children}) {
    const { data } = useSWR(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/sessions/`, fetcher);
    const router = useRouter();
    if (!data || data.isLoggedIn == false){
        return (
            <>
            <header>
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white justify-between relative">
                    <h1 className="inline-block text-3xl align-bottom ml-0">e-C4rte</h1>
                    <nav className="inline-block align-bottom">
                        <ul className="absolute bottom-0 right-0">
                            <li className="inline-block mx-4"><Link href="/"><a>home</a></Link></li>
                            <li className="inline-block mx-4"><Link href="/signUp"><a>会員登録</a></Link></li>
                            <li className="inline-block mx-4"><Link href="/login"><a>ログイン</a></Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
                {children}
            </>
        )
    }
    const des = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/sessions/logout`
        axios.delete(url, {withCredentials: true})
        .then(response => {
            console.log(response);
            router.reload();;
        })
        .catch(error => {
        })
    }
    return (
        <>
        <header>
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white justify-between relative">
                <h1 className="inline-block text-3xl align-bottom ml-0">e-C4rte</h1>
                <nav className="inline-block align-bottom">
                    <ul className="absolute bottom-0 right-0">
                        <li className="inline-block mx-4"><Link href="/"><a>home</a></Link></li>
                        <li  className="inline-block mx-4" onClick={()=>{des()}}>ログアウト</li>
                    </ul>
                </nav>
            </div>

            <nav className="block bg-black text-white">
                <ul className="text-center">
                    <li className="inline-block mx-4">生徒管理</li>
                    <li className="inline-block mx-4">予約管理</li>
                    <li className="inline-block mx-4">スタッフ管理</li>
                </ul>
            </nav>
        </header>
            {children}
        </>
    )
}
