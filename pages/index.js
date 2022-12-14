import Image from "next/image";
import IndexPageCard from "components/indexPage/indexPageCard";
import IndexPageButton from "components/indexPage/indexPageButton";
export default function Home() {
  return (
    <div className="">
      <main className="text-center relative">
        <div className="h-fit relative xl:h-80 xl:overflow-hidden">
          <Image
            src="/lp-photo.jpg"
            layout="responsive"
            width="3920"
            height="1000"
            className="z-0"
            alt=""
          />
          <div className="absolute top-1/2 right-0 w-full z-10 text-center">
            <p className="text-2xl md:text-4xl xl:text-6xl text-gray-100 font-shippori">
              シンプルな生徒管理を。
            </p>
          </div>
        </div>
        <section className="my-8">
          <h1 className="text-left text-2xl mx-auto w-fit font-bold">suBinderでできること</h1>
          <div className="flex md:justify-center overflow-x-auto overflow-y-hidden h-fit space-x-8 px-6 lg:space-x-16 mt-4">
            <IndexPageCard title="予約管理" text="予約可能枠の作成、生徒の予約登録ができます" />
            <IndexPageCard
              title="進捗管理"
              text="教材を登録し、生徒の進捗状況を管理することができます"
            />
            <IndexPageCard
              title="教員別アカウント"
              text="教員は個別のアカウントで、生徒に対する操作を行うことができます"
            />
          </div>
        </section>

        <section className="mb-8 h-fit">
          <h1 className="text-left text-2xl mx-auto w-fit font-bold">使ってみる</h1>
          <IndexPageButton href="/signUp/createGroup" text="グループを作成" />
          <p>または</p>
          <IndexPageButton href="/signUp/createUser" text="既存のグループに加わる" />
        </section>
      </main>
    </div>
  );
}
