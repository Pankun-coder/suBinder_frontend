import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useRouter } from "next/router";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/sessions/`, fetcher);

  useEffect(() => {
    if (!data || data.isLoggedIn === false) {
      setIsLoggedIn(false);
    }
    if (data && data.isLoggedIn == true) {
      setIsLoggedIn(true);
    }
  }, [data]);

  const handleLogout = () => {
    const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/sessions/logout`;
    axios
      .delete(url, { withCredentials: true })
      .then((response) => {
        console.log(response);
        router.reload();
      })
      .catch((error) => {});
  };

  if (isLoggedIn) {
    return (
      <>
        <header className="bg-gradient-to-r from-purple-400 to-purple-500">
          <div className="text-white justify-between relative">
            <h1 className="inline-block text-3xl align-bottom ml-0">e-C4rte</h1>
            <nav className="inline-block align-bottom">
              <ul className="absolute bottom-0 right-0">
                <li className="inline-block mx-4">
                  <Link href="/groupDashboard">
                    <a>ダッシュボード</a>
                  </Link>
                </li>
                <li
                  className="inline-block mx-4 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  ログアウト
                </li>
              </ul>
            </nav>
          </div>

          <nav className="block bg-black text-white">
            <ul className="text-center">
              <li className="group inline-block w-32 hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-500 hover:text-black">
                <a className="w-32 cursor-default">生徒管理</a>
                <ul className="absolute z-10 hidden group-hover:block w-32">
                  <li className="px-4 relative text-black bg-gradient-to-r from-purple-400 to-purple-500">
                    <Link href="/addStudent">
                      <a>生徒追加</a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="group inline-block w-32 hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-500 hover:text-black">
                <a className="w32 cursor-default">予約管理</a>
                <ul className="absolute z-10 hidden group-hover:block w-32">
                  <li className="px-4 relative text-black bg-gradient-to-r from-purple-400 to-purple-500">
                    <Link href="/addAvailability">
                      <a>予約枠追加</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="group inline-block w-32 hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-500 hover:text-black">
                <a className="w32 cursor-default">教材管理</a>
                <ul className="absolute z-10 hidden group-hover:block w-32">
                  <li className="px-4 relative text-black bg-gradient-to-r from-purple-400 to-purple-500">
                    <Link href="/addCourse">
                      <a>教材追加</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </>
    );
  } else {
    return (
      <>
        <header>
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white justify-between relative">
            <h1 className="inline-block text-3xl align-bottom ml-0">e-C4rte</h1>
            <nav className="inline-block align-bottom">
              <ul className="absolute bottom-0 right-0">
                <li className="inline-block mx-4">
                  <Link href="/">
                    <a>home</a>
                  </Link>
                </li>
                <li className="inline-block mx-4">
                  <Link href="/signUp">
                    <a>会員登録</a>
                  </Link>
                </li>
                <li className="inline-block mx-4">
                  <Link href="/login">
                    <a>ログイン</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </>
    );
  }
}
