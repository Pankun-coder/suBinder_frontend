import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function SearchStudent(props) {
    const [userInput, setUserInput] = useState("");
    const { data } = useSWR(`http://localhost:3001/api/v0/students/`, fetcher);
    const [errorMessage, setErrorMessage] = useState(null);
    const onClickHandle = () => {
        if (!parseInt(userInput)) {
            setErrorMessage(<p>サジェストを利用するか、idを入力してください</p>);
            return
        }
        const studentId = parseInt(userInput);
        const studentName = "";
        for ( let user in data){
            if (data[user].id == studentId) {
                studentName = data[user].name;
                break;
            }
        }
        setErrorMessage(null);
        props.setStudentInfo({ name: studentName, id: studentId })
    }

    return (
        <div className="w-full text-center h-18">
            <section className="block">
                <input autoComplete="on" list= "mylist" onChange={(e) => {setUserInput(e.target.value)}} value={userInput} placeholder="生徒名あるいは番号" className="border-2 border-black h-8 mt-1 w-96"></input>
                    <datalist id="mylist">
                        {data&&data.map(value => <option value={value.id + " " + value.name}></option>)}
                    </datalist>
                <input type="button" onClick={() => {onClickHandle()}} value="カルテを開く" />
            </section>
            {errorMessage}
        </div>

    )
}