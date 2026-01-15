'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { getProfile, updateProfile } from '@/lib/authService';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PageHeader from './PageHeader';

export default function ProfileInfo() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true)
    const [initialState, setInitialState] = useState<{
        firstName: string,
        lastName: string;
        username: String;
        email: string;
    } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)
            try {
                const res = await getProfile();
                const data = res.data;
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setUsername(data.username);
                setEmail(data.email);
                console.log(data)

                const snapshot = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    email: data.email
                }
                setInitialState(snapshot)
                setFirstName(snapshot.firstName)
                setLastName(snapshot.lastName)
                setUsername(snapshot.username)
                setEmail(snapshot.email)
            } catch (error) {
                router.push("/login");
                console.error("[ProfilePage] Could not load profile details:", error);
                toast.error("Failed to load profile")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile();

    }, []);


    const isDirty =
        !!initialState && (
            firstName != initialState.firstName ||
            lastName != initialState.lastName ||
            email != initialState.email
        )

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isDirty) return;
        setLoading(true);
        try {
            await updateProfile({ firstName, lastName, email });
            toast.dismiss();
            toast.success("Your profile has been updated", {
                className: "toast-progress",
            });
            setInitialState({
                firstName,
                lastName,
                username,
                email,
            });
        } catch (error) {
            console.error("update failed", error);
            toast.error("Failed to update the profile")
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="mt-10">
                <PageHeader href="/dashboard" />
            </div>
            <Card className="max-w-lg mx-auto mt-10 p-6">
                <CardHeader>
                    <CardTitle> My Profile</CardTitle>
                </CardHeader>
                <form onSubmit={handleUpdate}>
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
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={!isDirty || loading}
                            className={"w-full disabled:opacity-50 disabled:cursor-not-allowed"}
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </CardFooter>
                </form>
            </Card >
        </>
    )
}