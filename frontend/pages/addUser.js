import axios from "axios";
import Layout from "../layouts";
import { useState } from "react";

export default function AddUser() {
    const [studentName, setStudentName] = useState("");
    const createUserHandle = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/students`
        const data = {name: studentName}
        axios.post(url, data, {withCredentials: true})
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <label htmlFor="student-name">生徒名</label>
            <input id="student-name" onChange={(e) => {setStudentName(e.target.value)}} value={studentName} />
            <button onClick={() => {createUserHandle()}}>作成</button>

        </Layout>


    )
}