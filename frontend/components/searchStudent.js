import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function SearchStudent(props) {
    const [query, setQuery] = useState("");
    const { data } = useSWR(`http://localhost:3001/api/v0/students/search?query=${query}`, fetcher);

    return (
        <section>
            <input onChange={(e) => {setQuery(e.target.value)}} value={query} placeholder="生徒名あるいは番号"></input>
            {data&&data.map((value, index) => <p onClick={() => {props.setStudentId(value.id)}} key={index}>{value.name},{value.id}</p>)}
        </section>
    )
}