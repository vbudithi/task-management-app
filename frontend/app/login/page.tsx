'use client'
import { LoginForm } from "@/components/auth/LoginForm"
import AuthLayout from "../(auth)/AuthLayout"
import loginAnimation from "@/public/animations/login.json";

export default function Loginpage() {
 return(
       <AuthLayout animation ={loginAnimation}>
        <LoginForm />
       </AuthLayout>
 )
}