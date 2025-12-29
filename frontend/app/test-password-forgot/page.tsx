'use client'
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

export default function TestForgotPassword(){
    const [result, setResult] = useState("");

    useEffect(()=>{
        apiClient
        .post('/Password/forgot',{
            Email:"vivek@gmail.com"
        })
        .then((res) => setResult(JSON.stringify(res.data, null, 2)))
    },[])
    return(
        <div>
            <h1> Forgot Password</h1>
            <pre>{result}</pre>
        </div>
    )
}