import fetcher from "lib/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import Carte from "components/carte";
import { useContext } from "react";
import { isLoggedInContext } from "lib/isLoggedInContext";
import LoginRequiredModal from "components/common/loginRequiredModal";

export default function CartePage() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/groups/`,
    fetcher,
  );
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  if (!isLoggedIn) return <LoginRequiredModal />;
  if (!data) return <h1>loading...</h1>;
  return (
    <section>
      <div className="h-18">
        <h1 className="inline-block text-5xl align-middle">{data.group}</h1>
      </div>
      <Carte query={router.query} />
    </section>
  );
}
