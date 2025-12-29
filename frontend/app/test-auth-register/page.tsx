"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

export default function TestRegister(){
    const [result, setResult] = useState("");
 
    useEffect(()=>{
    apiClient
        .post("/UserAuth/register", {
            FirstName:"Vivek",
            LastName:"Bud",
            Username:"vivebud4055",
            Email:"vivek@gmail.com",
            Password:"vivek123456"
  })
  .then((res) => setResult(JSON.stringify(res.data,null,2)))
  .catch((err)=> setResult((err.message)));
    }, []);
    return(
        <div>
            <h1>Testing Register</h1>
            <pre>{result}</pre>
        </div>
    )
}