import axios from "axios";
import Layout from "../layouts";
import { useState } from "react";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import LoginRequiredModal from "../components/loginRequiredModal";
import BorderM from "../components/borderM";
import MessageModal from "../components/messageModal";

export default function AddUser() {
    const {isLoggedIn, setIsLoggedIn} = useContext(isLoggedInContext);
    const [studentName, setStudentName] = useState("");
    const [message, setMessage] = useState({body: "", isError: false});

    const createUser = () => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/students`;
        const data = {name: studentName};
        axios.post(url, data, {withCredentials: true})
        .then(response => {
            setMessage({body: response.data.message, isError: false});
        })
        .catch(error => {
            setMessage({body: error.response.data.message, isError: true});
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
            <BorderM>
                <form>
                    <div className="w-fit mx-auto my-4">
                        <label htmlFor="student-name">生徒名:</label>
                        <input className="border-2 border-black w-42" id="student-name" onChange={(e) => {setStudentName(e.target.value)}} value={studentName} />
                    </div>
                    <button type="button" className="border-2 border-black hover:bg-purple-400 hover:text-white hover:border-purple-400" onClick={() => {createUser()}}>生徒登録</button>
                </form>
            </BorderM>
            {message.body&&<MessageModal message={message.body} isError={message.isError} onClickClose={() => {setMessage({body: "", isError: false})}}></MessageModal>}            
        </Layout>
    )
}