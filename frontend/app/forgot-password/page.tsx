'use client'

import {useRouter} from"next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from"@/components/ui/card";
import { forgotPassword } from "@/lib/authService";
import {toast} from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const[email, setEmail] = useState("");
    const[loading, setLoading] = useState(false);
    const handleSubmit = async(e:React.FormEvent)=>{
          e.preventDefault();
          setLoading(true);
          try{
            await forgotPassword({
                Email:email,
            })
            console.log(email)
              toast.success("Password reset link sent to your email.", {
                  className: "toast-progress",
      });
      router.push("/forgot-password/success")
          }catch(err:any){
    toast.error("Registration Failed:" + (err.response?.data?.message ||"something went wrong"))
          }finally{
 setLoading(false);
          }
    };
  return (
    <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-lg w-full min-h-[30vh] p-10 flex flex-col justify-center">
        <CardHeader>
            <CardTitle className="text-2xl font-serif font-extrabold tracking-wide">
                Forgot Password
            </CardTitle>
               <CardDescription className="text-base">
            Enter your email and we’ll send you a password reset link.
        </CardDescription>
        </CardHeader>
            <form onSubmit={handleSubmit} >
                <CardContent className="space-y-4" >
                        <Input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        required
                        onChange={(e)=>setEmail(e.target.value)} />
                        <Button type="submit" disabled={loading} className="w-full cursor-pointer">
                    {loading?"Sending.....":"Send Reset Link"}
                    </Button>
                </CardContent>
            </form>
        </Card>
    </div>
  )
}
