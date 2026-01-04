'use client'
import AuthLayout from "../(auth)/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import forgotAnimation from "@/public/animations/forgot.json";

export default function ForgotPasswordPage() {
   return(
    <AuthLayout animation = {forgotAnimation}>
      <ForgotPasswordForm />

    </AuthLayout>
   )
}
