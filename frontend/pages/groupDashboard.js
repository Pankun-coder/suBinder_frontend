import axios from "axios";
import Layout from "../layouts";
import useSWR from "swr";
import SearchStudent from "../components/searchStudent"
import { useState } from "react";

export default function GroupDashboard() {
    const fetcher = (url)=> axios.get(url, { withCredentials: true }).then(res => res.data)    
    const { data, error } = useSWR("http://localhost:3001/api/v0/groups/", fetcher)
    const [student, setStudent] = useState("");
    let message = "";
    let groupName = "";
    if (data) {
        message = data.message;
        groupName = data.group;
    } else {
        message = "loading...";
        groupName = "loading...";
    };
    return (
        <Layout>
        <h2>{message}</h2>
        <h2>{groupName}</h2>
        <SearchStudent setStudent={(studentName) => {setStudent(studentName)}} />
        <h2>{student}</h2>
        </Layout>
    )
}