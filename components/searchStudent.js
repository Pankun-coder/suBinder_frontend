import { useState } from "react";
import useSWR from "swr";
import fetcher from "lib/fetcher";
import { useRouter } from "next/router";

export default function SearchStudent(props) {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/students/`, fetcher);
  const router = useRouter();
  const [userInput, setUserInput] = useState("");

  const searchStudent = () => {
    router.push(`/cartePage?studentId=${parseInt(userInput)}`);
  };

  return (
    <div className="w-full text-center h-18">
      <section className="block">
        <input
          autoComplete="on"
          list="student-list"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          value={userInput}
          placeholder="生徒番号"
          className="border-2 border-black md:h-8 mt-1 md:w-96"
        ></input>
        <datalist id="student-list">
          {data &&
            data.map((value, index) => (
              <option key={index} value={value.id + " " + value.name}></option>
            ))}
        </datalist>
        <input
          type="button"
          onClick={() => {
            searchStudent();
          }}
          value="検索"
          className="border-2 border-black mx-2 cursor-pointer"
        />
      </section>
    </div>
  );
}
