import fetcher from "../lib/fetcher";
import Layout from "../layouts";
import useSWR from "swr";
import SearchStudent from "../components/searchStudent"
import { useState } from "react";
import Carte from "../components/carte";

export default function GroupDashboard() {
    const { data, error } = useSWR("http://localhost:3001/api/v0/groups/", fetcher)
    const [studentInfo, setStudentInfo] = useState({});

    let message = "";
    let groupName = "";
    if (data) {
        message = data.message;
        groupName = data.group;
        console.log(data);
    } else {
        message = "loading...";
        groupName = "loading...";
    };
    if(error) console.log(error);

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