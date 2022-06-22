import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

export default function SearchStudent(props) {
    const [query, setQuery] = useState("");
    const fetcher = (url)=> axios.get(url, { withCredentials: true }).then(res => res.data)
    const { data, error } = useSWR(`http://localhost:3001/api/v0/students/search?query=${query}`, fetcher)
    const suggestions = () => {
        let body = [];
        if (data) {
            for (const student in data.suggestions) {
                body.push(
                    <div>
                        <p onClick={() => {props.setStudent(data.suggestions[student].name)}} >{data.suggestions[student].name},{data.suggestions[student].id}</p>
                    </div>
                );
            }
        }
        return body;
    }

    return (
        <section>
            <input onChange={(e) => {setQuery(e.target.value)}} value={query} placeholder="生徒名あるいは番号"></input>
            {suggestions()}
        </section>
    )
}