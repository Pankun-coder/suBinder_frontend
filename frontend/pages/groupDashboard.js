import fetcher from "../lib/fetcher";
import Layout from "../layouts";
import useSWR from "swr";
import SearchStudent from "../components/searchStudent"
import { useState } from "react";
import Carte from "../components/carte";

export default function GroupDashboard() {
    const { data, error } = useSWR("http://localhost:3001/api/v0/groups/", fetcher)
    const [studentId, setStudentId] = useState();

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
            <h2>{message}</h2>
            <h2>{groupName}</h2>
            <SearchStudent setStudentId={(studentId) => {setStudentId(studentId)}} />
            <h2>{studentId}</h2>
            <Carte studentId={studentId}/>
        </Layout>
    )
}