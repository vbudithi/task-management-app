'use client'

import { RegisterForm } from "@/components/auth/RegisterForm";
import AuthLayout from "../(auth)/AuthLayout";
import registrationAnimation from "@/public/animations/registration.json";

export default function RegisterPage() {
 return(
  <AuthLayout animation={registrationAnimation}>
   <RegisterForm />
  </AuthLayout>
 )
}