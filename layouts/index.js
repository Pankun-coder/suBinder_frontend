import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useRouter } from "next/router";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/sessions/`, fetcher);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

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
        <header className="sticky top-0 w-full h-12 md:h-24 xl:h-fit xl:relative bg-gradient-to-r from-purple-400 to-purple-500">
          <div className="text-white justify-between relative">
            <h1 className="inline-block text-3xl text-4xl md:text-8xl xl:text-3xl align-bottom ml-0">
              e-C4rte
            </h1>
            <nav className="inline-block align-bottom">
              <ul className="hidden xl:block xl:absolute bottom-0 right-0">
                <li className="inline-block mx-4">
                  <Link href="/groupDashboard">
                    <a>ダッシュボード</a>
                  </Link>
                </li>
                <li
                  id="right-1/2 inline"
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

          <nav className="absolute xl:hidden h-12 md:h-24 xl:h-fit right-0 top-0">
            <div
              className={
                isMenuOpened
                  ? "text-right w-fit h-fit mr-2 my-auto absolute right-0 text-white transition"
                  : "text-right w-fit h-fit mr-2 my-auto absolute right-0 transition"
              }
              onClick={() => {
                setIsMenuOpened(!isMenuOpened);
              }}
            >
              <div
                className={
                  isMenuOpened
                    ? "h-1 md:h-2 w-10 md:w-24 my-2 md:my-5 -rotate-45  md:translate-y-7 translate-x-1 translate-y-3 bg-black transition"
                    : "h-1 md:h-2 w-8 md:w-20 my-2 md:my-5 bg-white/[0.7] transition"
                }
              ></div>
              <div
                className={
                  isMenuOpened
                    ? "h-1 md:h-2 w-8 md:w-24 my-2 md:my-5"
                    : "h-1 md:h-2 w-8 md:w-20 my-2 md:my-5 bg-white/[0.7]"
                }
              ></div>
              <div
                className={
                  isMenuOpened
                    ? "h-1 md:h-2 w-10 md:w-24 my-2 md:my-5 translate-x-1 -translate-y-3 md:-translate-y-7 rotate-45 bg-black transition"
                    : "h-1 md:h-2 w-8 md:w-20 my-2 md:my-5 bg-white/[0.7] transition"
                }
              ></div>
            </div>
            {isMenuOpened ? (
              <div
                className="fixed top-0 left-0 w-full h-full z-2 bg-black/[0.8] mt-12 md:mt-24"
                onClick={() => {
                  setIsMenuOpened(false);
                }}
              ></div>
            ) : null}
            <ul
              className={
                isMenuOpened
                  ? "fixed inline w-56 md:w-2/3 -translate-x-full transition bg-purple-500/[0.7] transition text-3xl md:text-7xl font-light mt-12 md:mt-24 text-right"
                  : "fixed inline w-56 transition mt-12 md:mt-24"
              }
            >
              <li
                className="cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                ログアウト
              </li>
              <li
                className=""
                onClick={() => {
                  setIsMenuOpened(false);
                }}
              >
                <Link href="/groupDashboard">
                  <a>ダッシュボード</a>
                </Link>
              </li>
              <li className="md:mt-8">
                <a className="text-4xl md:text-8xl font-bold">生徒管理</a>
                <ul className="">
                  <li
                    className=""
                    onClick={() => {
                      setIsMenuOpened(false);
                    }}
                  >
                    <Link href="/addStudent">
                      <a>生徒追加</a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="md:mt-8">
                <a className="text-4xl md:text-8xl font-bold">予約管理</a>
                <ul className="">
                  <li
                    className=""
                    onClick={() => {
                      setIsMenuOpened(false);
                    }}
                  >
                    <Link href="/addAvailability">
                      <a>予約枠追加</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="md:mt-8">
                <a className="text-4xl md:text-8xl font-bold">教材管理</a>
                <ul className="">
                  <li
                    onClick={() => {
                      setIsMenuOpened(false);
                    }}
                    className=""
                  >
                    <Link href="/addCourse">
                      <a>教材追加</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <nav className="hidden xl:block bg-black text-white">
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
        <div className="hidden h-16"></div>
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
