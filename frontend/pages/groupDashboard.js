import axios from "axios";
import Layout from "../layouts";
import useSWR from "swr";



export default function GroupDashboard() {
    return (
        <Layout>
        here comes contents
        {fetchGroupData()}
        </Layout>
    )
}

const fetcher = (url)=> axios.get(url, { withCredentials: true }).then(res => res.data)

function fetchGroupData() {
    const { data, error } = useSWR("http://localhost:3001/api/v0/groups/", fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data)
    return <div>hello</div>
}

