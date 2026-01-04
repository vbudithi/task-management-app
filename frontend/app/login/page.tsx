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
  const[loading,setLoading] =useState(false);

  const handleLogin=async(e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
     await loginUser({
        LoginInput: username,
        Password: password,
      });
      toast.success("Logged in successfully");
      router.push("/dashboard")

    }catch(error){
          toast.error("Login Failed : Invalid credentials");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" >
      <Card className="max-w-lg w-full min-h-[30vh] p-10 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold font-serif tracking-wide"> Log in </CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <Input 
              type="text"
              placeholder="Username or Email"
              value={username}  
              onChange ={e=>setUsername(e.target.value)}
              required
              />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange ={e=>setPassword(e.target.value)}
              required
              />
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" disabled={loading} className="w-full cursor-pointer">
              {loading ? "Logging in...": "Log In"}
            </Button> 
            <a
              href="/forgot-password"
              className="font-medium text-blue-700 hover:text-blue-600"
            >
              Forgot Password
            </a>
            <p className="text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="underline text-red-500 hover:text-blue-600 font-semibold"
              >
               Register
              </a>
            </p>
          </CardFooter>
        </CardContent>   
        </form>
      </Card>
    </div>
  )
}