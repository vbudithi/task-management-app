'use client';

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

export default function TestResetPassword(){
    const [result, setResult] = useState("");

    useEffect(()=>{
         apiClient
         .post("/Password/reset",{
            Token:"a25ddae9-6beb-412d-b4dd-86f673b660bf",
            NewPassword:"vivek12345"
         })
         .then((res)=> setResult(JSON.stringify(res.data, null,2)))
         .catch((err) =>setResult(err.message));
    },[])

    return(
        <div>
            <h1> Reset Password Test</h1>
            <pre>{result}</pre>
        </div>
    )
}
