'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {toast} from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerUser({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Username: username,
        Password: password,
      })
      console.log(firstName, lastName, email, username, password)
      // setSuccess("Account created !  You can now login");
      toast.success("Registered successfully", {
        className: "toast-progress",
      });
      router.push("/login")
    } catch (err: any) {
      console.error(error)
      setError("Registration Failed:" + (err.response?.data?.message || err.message))
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" >
      <Card className="max-w-lg w-full min-h-[30vh] p-10 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold font-serif tracking-wide"> Register </CardTitle>
        </CardHeader>

        <form onSubmit={handleRegister} className="space-y-4">
          <CardContent>
            <div>
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setlastName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <CardFooter className="flex flex-col items-center space-y-2 mt-4">
              <Button type="submit" className="w-full cursor-pointer">Sign Up</Button>
              <p className="text-sm">
                Already have an account?, click here to <a href="/login" className="text-sm underline text-red-500 hover:text-blue-600 font-semibold">Login</a>
              </p>
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
