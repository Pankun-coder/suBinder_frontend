import Link from "next/link";
import ModalS from "components/common/modalS";
import { useRouter } from "next/router";
export default function LoginRequiredModal() {
  const router = useRouter();
  return (
    <ModalS
      onClickClose={() => {
        router.push("/");
      }}
    >
      <div className="w-full md:h-full pb-2 flex flex-col items-center">
        <span className="bg-red-600 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl md:py-2">
          ERROR
        </span>
        <div className="flex flex-col items-center justify-center grow ">
          <div>
            <h1 className="text-black text-xl md:text-4xl md:font-thin py-2">
              ログインが必要なページです
            </h1>
            <Link href="/login">
              <a className="border-b-2 border-blue-400 w-fit mb-4 text-blue-700 my-auto md:text-xl">
                ログインページへ
              </a>
            </Link>
          </div>
        </div>
      </div>
    </ModalS>
  );
}
