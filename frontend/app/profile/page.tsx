'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { getProfile, updateProfile } from '@/lib/authService';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log(token, "token-ProfilePage");

      if (!token) return (window.location.href = "/login");
      try {
        const res = await getProfile();
        const data = res.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.username);
        setEmail(data.email);
        console.log(data)
      } catch (error) {
        console.error("[ProfilePage] Could not load profile details:", error);
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile({ firstName, lastName, email });
       toast.dismiss();
      toast.success("Your profile has been updated", {
          className: "toast-progress",
        });
    } catch (error) {
      console.error("update failed", error);
      toast.error("Failed to update the profile")
    }
  }
  
  return (
    <Card className="max-w-lg mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle> My Profile</CardTitle>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="space-y-2">
             <Label htmlFor="lastname">Last Name</Label>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="space-y-2">
                <Label htmlFor="email">email</Label>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
             <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)} disabled />
          </div>
        </CardContent>
      </form>
      <CardFooter>
        <Button variant="outline" className="cursor-pointer" onClick={handleUpdate}>
          Update
        </Button>
      </CardFooter>
    </Card>
  )
}