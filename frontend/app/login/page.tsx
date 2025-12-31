'use client'

import { useState} from "react";
import {useRouter} from"next/navigation";
import { loginUser } from "@/lib/authService";
import {Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function Loginpage() {
  const router = useRouter();
  const[username, setUsername] = useState(""); 
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");

  const handleLogin=async(e:React.FormEvent) => {
    e.preventDefault();
    setError("");
    try{
      const{Token,RefreshToken} = await loginUser({ 
        LoginInput:username,
        Password: password,
      });
      console.log(username, password)

      //store token
      localStorage.setItem("token", Token);
      localStorage.setItem("refreshToken", RefreshToken);
      console.log("Login Successful")
      toast.success("Logged in successfully", {
          className: "toast-progress",
        });
         router.push("/dashboard")

    }catch(err:any){
          console.error(error)
          setError("Login Failed :" + (err.response?.data?.message || err.message))
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" >
      <Card className="max-w-lg w-full min-h-[30vh] p-10 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold font-serif tracking-wide"> Log in </CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <CardContent>
          <div>
            <Input 
              type="text"
              placeholder="Username or Email"
              value={username}  
              onChange ={e=>setUsername(e.target.value)}
              required
              />
            </div>
            <div className="mt-4">
            <Input 
              type="text"
              placeholder="Password"
              value={password}
              onChange ={e=>setPassword(e.target.value)}
              required
              />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <CardFooter className="flex flex-col items-center space-y-2 mt-4">
            <Button type="submit" className="w-full cursor-pointer">Log In</Button> 
            <p className="text-sm">
             Don't have an account?, click here to <a href="/register" className="text-sm underline text-red-500 hover:text-blue-600 font-semibold">Register</a>
            </p>
          </CardFooter>
        </CardContent>   
        </form>
      </Card>
    </div>
  )
}
