export default function ForgotPasswordSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">Reset link sent successfully</h1>
        <p className="text-gray-600">
          If an account exists with this email, you will receive a password reset link shortly.
          Please check your inbox.
        </p>
        <a
          href="/login"
          className="text-blue-600 underline hover:text-blue-500"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}