import fetcher from "../lib/fetcher";
import Layout from "../layouts";
import useSWR from "swr";
import SearchStudent from "../components/searchStudent"
import { useState } from "react";
import Carte from "../components/carte";

export default function GroupDashboard() {
    const { data, error } = useSWR(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/groups/`, fetcher)
    const [studentInfo, setStudentInfo] = useState({});
    if (!data) return <h1>Loading....</h1>
    if(error) console.log(error);
    const groupName = data.group;

    return (
        <Layout>
            <div className="h-18">
                <h2 className="inline-block text-5xl align-middle">{groupName}</h2>
            </div>
            <SearchStudent setStudentInfo={(studentInfo) => {setStudentInfo(studentInfo)}} />

            <Carte studentInfo={studentInfo}/>
        </Layout>
    )
}