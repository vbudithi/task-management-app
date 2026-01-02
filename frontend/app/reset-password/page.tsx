'use client'

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {toast} from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  const[loading, setLoading] =useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword!= confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
    setLoading(true);
    try {
      await resetPassword({
        NewPassword: newPassword,
        Token:token!
      })
      console.log(newPassword, token)
      toast.success("Registered successfully", {
        className: "toast-progress",
      });
      router.push("/login")
    } catch (err: any) {
      toast.error("Resetting Password Failed:" + (err.response?.data?.message || "Resetting Password Failed. Please try again"))
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" >
      <Card className="max-w-lg w-full min-h-[30vh] p-10 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold font-serif tracking-wide"> Reset Password </CardTitle>
        </CardHeader>
        <form onSubmit={handleReset} >
          <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button type="submit" disabled={loading} className="w-full cursor-pointer" >
                {loading ? "Resetting Password...": "Reset Password"}
              </Button>
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}