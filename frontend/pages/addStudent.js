import axios from "axios";
import Layout from "../layouts";
import { useState } from "react";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import LoginRequiredModal from "../components/loginRequiredModal";

export default function AddUser() {
    const {isLoggedIn} = useContext(isLoggedInContext);
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

    if (!isLoggedIn){
        return (
            <Layout>
                <LoginRequiredModal />
            </Layout>
        )
    }

    return (
        <Layout>
            <section className="border-4 border-purple-400 w-3/4 mx-auto my-8 p-4 text-center">
                <form>
                    <div className="w-fit mx-auto my-4">
                        <label htmlFor="student-name">生徒名:</label>
                        <input className="border-2 border-black w-42" id="student-name" onChange={(e) => {setStudentName(e.target.value)}} value={studentName} />
                    </div>
                    <button className="border-2 border-black hover:bg-purple-400 hover:text-white hover:border-purple-400" onClick={() => {createUserHandle()}}>生徒登録</button>
                </form>

            </section>
        </Layout>


    )
}