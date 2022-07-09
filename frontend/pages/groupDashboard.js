import fetcher from "../lib/fetcher";
import Layout from "../layouts";
import useSWR from "swr";
import { useRouter } from "next/router";
import Carte from "../components/carte";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import LoginRequiredModal from "../components/loginRequiredModal";

export default function GroupDashboard() {
    const { data, error } = useSWR(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/groups/`, fetcher)
    const router = useRouter();
    const {isLoggedIn, setIsLoggedIn} = useContext(isLoggedInContext);
    if (!isLoggedIn) {
        return (
            <Layout>
                <LoginRequiredModal />
            </Layout>
        )
    }
    if (!data) {
        return (
            <Layout>
                <h1>loading...</h1>
            </Layout>
        )
    }
    return (
        <Layout>
            <div className="h-18">
                <h2 className="inline-block text-5xl align-middle">{data.group}</h2>
            </div>
            <Carte query={router.query} />
        </Layout>
    )
}